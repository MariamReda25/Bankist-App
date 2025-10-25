# 🏦 Bankist App

A minimalist online banking web application that simulates modern banking features like money transfers, loan requests, and account management — all implemented with JavaScript and following clean modular design principles.

---

## 🚀 Project Overview

**Bankist** is a front-end web app designed to demonstrate key JavaScript concepts such as **DOM manipulation**, **event handling**, **array methods**, **timers**, and **state updates**.  
It mimics core banking operations, allowing users to:
- Log in using secure credentials,
- Transfer funds between accounts,
- Request loans,
- Close their accounts, and
- Sort transactions — all dynamically updated on the UI.

This project is inspired by **Jonas Schmedtmann’s “Bankist” project** from *The Complete JavaScript Course*

---

## 🧠 Architecture

The Bankist App is built around **event-driven UI updates** and maintains a consistent state between user actions and displayed information.

![Bankist App Architecture Flowchart](./Bankist-flowchart.png)

### Key Components:

- **State Management:**  
  Each user account maintains its own transaction data, login credentials, and session state.

- **UI Update Cycle:**  
  Every successful user action (login, transfer, loan, close account) triggers the **Update UI** block, which:
  - Calculates and displays the current balance  
  - Computes income, outcome, and interest summary  
  - Renders all movements (transactions)  
  - Starts or restarts the logout timer

- **Security Simulation:**  
  Session timeout functionality automatically logs the user out after inactivity.

---

## ✨ Features

- 🔐 **Login System:**  
  Users log in using a username and PIN combination.

- 💸 **Money Transfers:**  
  Transfer funds to another user in real-time with balance updates.

- 💰 **Loan Requests:**  
  Automatically approves a loan if the user has a deposit ≥ 10% of the requested amount.

- 🧮 **Balance & Summary:**  
  Displays total deposits, withdrawals, and interest.

- 🧾 **Transaction History:**  
  View and sort all movements (credits & debits).

- 🕒 **Auto Logout Timer:**  
  Security feature that logs out inactive users.

- ❌ **Account Closure:**  
  Permanently delete an account after verifying credentials.

- ⚡ **Instant UI Updates:**  
  Every action immediately reflects changes in the interface.

---
## 🧭 How to Run the Project

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/MariamReda25/Bankist-App
cd bankist-app
```
### 2️⃣ Run Locally
Open index.html directly in your browser
—or— use a live server:

## 💻 Projet Demo :
🔗 [Demo](https://drive.google.com/file/d/1UL6VDAO5f0GvTiuuegAOWQxbmFM44FpX/view?usp=sharing)

  
## 📌 Project link on Netlify :
🔗 https://bankist-app-array-practice.netlify.app/