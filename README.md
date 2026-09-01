<p align="center">
  <img src="assets/logo_sphexn.png" alt="SPHEXN Logo" width="160" />
</p>

<h1 align="center">SPHEXN</h1>

<p align="center">
  <strong>Deterministic Governance Suite, Continuous Verification & Structural Armor for the Terra Ecosystem</strong><br>
  <em>$0 Infrastructure Cost • Zero-Dependencies • Ephemeral Execution • Closed-Loop Self-Healing</em>
</p>

<p align="center">
  <a href="https://amglogicalis.github.io/sphexn-repo-public/" target="_blank">
    <img src="https://img.shields.io/badge/🕸️%20Web%20Console-SPHEXN%20NEST%20STUDIO-2563eb?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Live Console">
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-2563eb.svg" alt="Version">
  <img src="https://img.shields.io/badge/license-MIT-f59e0b.svg" alt="License">
  <img src="https://img.shields.io/badge/compute-GitHub%20Actions%20($0)-22c55e.svg" alt="Compute">
  <img src="https://img.shields.io/badge/storage-.sphexn--storage%20Vault-2563eb.svg" alt="Storage">
  <img src="https://img.shields.io/badge/ecosystem-Terra-38bdf8.svg" alt="Terra Ecosystem">
  <img src="https://img.shields.io/badge/npm-terra--sphexn-red.svg" alt="NPM Package">
</p>

---

## 🐝 Visión y Filosofía

En el desarrollo de software moderno, la gobernanza del código, la auditoría de seguridad y la orquestación de CI/CD suelen requerir plataformas pesadas y costosas que introducen overhead y cuotas fijas.

**SPHEXN** nace para resolver esto mediante la optimización absoluta. Inspirado en la avispa *Sphex* —famosa en la ciencia cognitiva por su comportamiento de rutinas preprogramadas e inquebrantables—, Sphexn es una suite de gobernanza determinista.

Se ejecuta de forma efímera utilizando **únicamente las primitivas nativas de Node.js** (`node:vm`, `node:crypto`, `node:child_process`, `node:https`) y la infraestructura gratuita de **GitHub Actions** para auditar, reparar y orquestar el ciclo de vida del software con coste cero en reposo.

---

## 🏛️ Las 6 "Sphexn Species"

A diferencia de los agentes cognitivos que improvisan rutas, las especies de Sphexn ejecutan misiones predefinidas con un éxito matemático:

| Especie | Rol | Mecánica | Modo IA |
| :--- | :--- | :--- | :---: |
| 🔍 **Sphexn Lucae** | *Complejidad & Arquitectura* | Análisis AST nativo de complejidad ciclomática, God Files y síntesis de diagramas Mermaid. | **Zero-AI (100% Determinista)** |
| 🦅 **Sphexn Praedator** | *Auditor de Pull Requests* | Auditoría quirúrgica sobre el git diff: detecta breaking changes, filtraciones de secretos y fallos lógicos. | Phantom Intelligence |
| 📝 **Sphexn Micans** | *Sincronizador de Docs* | Detecta discrepancias código-documentación y aplica parches quirúrgicos de secciones sin truncar. | Phantom Intelligence |
| 🩹 **Sphexn Nudus** | *Auto-Curación & Tests* | Ejecuta pruebas, aísla stack traces y aplica fixes en bucle cerrado (1-5 intentos). Abre Issue si falla. | Phantom Intelligence |
| 👑 **Sphexn Rex** | *Orquestador DevOps* | Lee planes declarativos en Markdown (`sphexn_rex.md`), ejecuta tareas y emite reportes en Step Summary. | Phantom Intelligence |
| 🛡️ **Sphexn Obscurus** | *Filtro Anti-Alucinación* | Valida sintaxis estricta y llamadas a APIs de código generado por LLMs antes de aplicarlo a producción. | Determinista + AST |

---

## 🧠 Phantom Intelligence (BYOAI)

Sphexn es determinista: no aloja modelos pesados internamente. En las especies que requieren inferencia, delega en la capa **Phantom Intelligence** con fallback automático y protección de cuotas:

* **Hiven API** (Nativo Terra)
* **Google Gemini** (Free Tier)
* **Groq** (Ultra-rápido)
* **GitHub Models**
* **Cohere / SambaNova / Cerebras / OpenRouter / Tenzor / Ollama**

---

## 💻 Instalación y CLI

```bash
# Instalación global
npm install -g terra-sphexn

# Ejecutar análisis arquitectónico con Lucae
sphexn lucae --repo .

# Auditar un Pull Request con Praedator
sphexn praedator --diff-range HEAD~1

# Sincronizar documentación con Micans
sphexn micans --dry-run

# Ejecutar tests con auto-curación Nudus
sphexn nudus --test-cmd "npm test" --max-retries 3

# Orquestar tareas DevOps con Rex
sphexn rex --plan sphexn_rex.md --self-heal

# Filtrar alucinaciones de IA con Obscurus
sphexn obscurus --input output.json

# Lanzar la Consola Web local
sphexn console --port 7462
```

---

## 🖥️ Consola Web: Sphexn Nest Studio

Lanza localmente o visita la versión desplegada 24/7 en GitHub Pages:
👉 **[Abrir Sphexn Nest Studio en GitHub Pages](https://amglogicalis.github.io/sphexn-repo-public/)**

---

<p align="center">
  <sub>Desarrollado bajo la filosofía Terra • $0 Infraestructura • Cero Dependencias • Ejecución Efímera</sub>
</p>
