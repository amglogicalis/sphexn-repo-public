const fs = require('fs');
const path = require('path');

const repo = process.argv[2] || 'amglogicalis/pokemon-tcg-project';
const branch = process.argv[3] || 'main';
const threshold = parseInt(process.argv[4], 10) || 500;

const targetDir = path.join(process.cwd(), 'target-code');
const validExts = [
  '.ts', '.js', '.mjs', '.cjs', '.jsx', '.tsx',
  '.py', '.go', '.rs', '.java', '.c', '.cpp', '.h', '.hpp',
  '.cs', '.php', '.vue', '.svelte', '.rb', '.swift', '.kt', '.scala',
  '.sh', '.bash', '.html', '.css', '.scss', '.sql'
];
const excludeDirs = ['.git', 'node_modules', 'vendor', 'dist', 'coverage', '.sphexn'];

function scan(dir) {
  let files = [];
  try {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      if (excludeDirs.includes(ent.name)) continue;
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) files = files.concat(scan(full));
      else if (ent.isFile() && validExts.some(x => ent.name.endsWith(x))) files.push(full);
    }
  } catch (e) {}
  return files;
}

const files = scan(targetDir);
console.log(`Found ${files.length} source files to analyze in ${repo}.`);

function calcCC(code) {
  let cc = 1;
  const patterns = [
    /\bif\s*\(/g,
    /\belse\s+if\s*\(/g,
    /\bfor\s*\(/g,
    /\bwhile\s*\(/g,
    /\bcase\s+[^:]+:/g,
    /\bcatch\s*\(/g,
    /\?\s*[^:]+\s*:/g,
    /&&/g,
    /\|\|/g,
    /\?\?/g
  ];
  for (const p of patterns) {
    const m = code.match(p);
    if (m) cc += m.length;
  }
  return cc;
}

function extractFunctions(code) {
  const funcs = [];
  const lines = code.split('\n');
  const fnRegex = /(?:function\s+([a-zA-Z0-9_$]+)|const\s+([a-zA-Z0-9_$]+)\s*=\s*(?:async\s*)?\((.*?)\)\s*=>|def\s+([a-zA-Z0-9_]+)\((.*?)\)|(?:public|private|async|static)?\s*([a-zA-Z0-9_$]+)\s*\([^)]*\)\s*\{)/g;
  let match;
  while ((match = fnRegex.exec(code)) !== null) {
    const name = match[1] || match[2] || match[4] || match[6];
    if (!name || ['if', 'for', 'while', 'switch', 'catch', 'return'].includes(name)) continue;
    const beforeStr = code.substring(0, match.index);
    const lineNum = beforeStr.split('\n').length;
    const block = lines.slice(lineNum - 1, lineNum + 45).join('\n');
    const cc = calcCC(block);
    funcs.push({ name, line: lineNum, cc });
  }
  return funcs;
}

function extractImports(code) {
  const imports = [];
  const regexes = [
    /import\s+(?:\{[^}]+\}|\*\s+as\s+[a-zA-Z0-9_$]+|[a-zA-Z0-9_$]+)?\s*from\s+['"]([^'"]+)['"]/g,
    /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g
  ];
  for (const r of regexes) {
    let m;
    while ((m = r.exec(code)) !== null) {
      if (m[1] && !m[1].startsWith('node:') && !['react', 'express', 'dotenv', 'cors'].includes(m[1])) {
        imports.push(m[1]);
      }
    }
  }
  return imports;
}

let totalLines = 0;
let godFiles = [];
let results = [];
let allEdges = [];

for (const f of files.slice(0, 50)) {
  try {
    const content = fs.readFileSync(f, 'utf8');
    const lines = content.split('\n').length;
    totalLines += lines;
    const cc = calcCC(content);
    const rel = path.relative(targetDir, f).replace(/\\/g, '/');

    const fns = extractFunctions(content);
    const topFn = fns.length > 0
      ? fns.reduce((p, c) => c.cc > p.cc ? c : p, fns[0])
      : { name: 'mainScope', line: 1, cc };

    const imports = extractImports(content);
    for (const imp of imports) {
      allEdges.push({ from: rel, to: imp });
    }

    // Refined God File Criterion: > threshold OR (> 250 lines AND CC > 45)
    const isGod = lines > threshold || (lines >= 250 && cc > 45);
    if (isGod) {
      godFiles.push({
        file: rel,
        lines,
        cc,
        topFunction: topFn.name,
        topFunctionLine: topFn.line,
        topFunctionCC: topFn.cc
      });
    }

    results.push({
      file: rel,
      lines,
      cc,
      isGod,
      topFunction: topFn.name,
      topFunctionLine: topFn.line,
      topFunctionCC: topFn.cc,
      imports
    });
  } catch (e) {}
}

const avgCC = results.length > 0 ? Number((results.reduce((a, b) => a + b.cc, 0) / results.length).toFixed(1)) : 0;
let score = 100 - Math.min(40, godFiles.length * 8);
if (avgCC > 25) score -= 15; else if (avgCC > 15) score -= 8;
score = Math.max(10, Math.min(100, Math.round(score)));

// Generate tailored recommendations
const recommendations = [];
for (const gf of godFiles.slice(0, 5)) {
  const base = gf.file.split('/').pop();
  if (gf.lines > 800) {
    recommendations.push(`Descomponer \`${base}\` (${gf.lines} líneas): extraer subcomponentes y vistas hijas para reducir el peso de renderizado.`);
  } else if (gf.cc > 50) {
    recommendations.push(`Refactorizar lógica condicional en \`${base}\` (Complejidad CC: ${gf.cc}): desacoplar en handlers o servicios auxiliares.`);
  } else {
    recommendations.push(`Modularizar \`${base}\` (${gf.lines} líneas, CC ${gf.cc}): separar responsabilidades de datos y presentación.`);
  }
}

console.log('=========================================');
console.log('=== SPHEXN LUCAE ENTERPRISE ARCHITECTURAL REPORT ===');
console.log(`Repo: ${repo} (@${branch})`);
console.log(`Health Score: ${score}/100`);
console.log(`Archivos Analizados: ${results.length} (${totalLines} líneas)`);
console.log(`Complejidad Ciclomática Media: ${avgCC}`);
console.log(`God Files Detectados: ${godFiles.length}`);
for (const gf of godFiles) {
  console.log(`  - ${gf.file}: ${gf.lines} líneas, CC ${gf.cc}, Función crítica: ${gf.topFunction} (L:${gf.topFunctionLine}, CC:${gf.topFunctionCC})`);
}
console.log('=========================================');

const outDir = path.join(process.cwd(), 'audits', 'lucae');
fs.mkdirSync(outDir, { recursive: true });
const auditFile = path.join(outDir, `audit-${Date.now()}.json`);
fs.writeFileSync(auditFile, JSON.stringify({
  repo,
  branch,
  threshold,
  score,
  totalFiles: results.length,
  totalLines,
  avgCC,
  godFiles,
  recommendations,
  files: results.slice(0, 25),
  edges: allEdges.slice(0, 40),
  timestamp: new Date().toISOString()
}, null, 2));
console.log(`✔ Audit saved to ${auditFile}`);
