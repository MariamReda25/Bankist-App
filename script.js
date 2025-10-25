'use strict';

/////////////////////////////////////////////////
// Data

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2025-10-10T18:15:16.371Z',
    '2025-10-09T12:01:20.894Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2025-08-20T18:49:59.371Z',
    '2025-08-25T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2025-08-20T18:49:59.371Z',
    '2025-08-25T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2025-08-20T18:49:59.371Z',
    '2025-08-25T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4];
let currentAccount;
let timer;
///////////////////////////////////////
// HTML Elements
//////////////////////////////////////
const app = document.querySelector('.container');
const movementsEl = document.querySelector('.movements');
// labels
const labelWelcome = document.querySelector('.welcome');
const labelBalance = document.querySelector('.balance-value');
const labelDate = document.querySelector('.balance-date');
const labelTime = document.querySelector('.log-out__time');
const summaryIn = document.querySelector('.value--in');
const summaryOut = document.querySelector('.value--out');
const summaryInterest = document.querySelector('.value--interest');
// Inputs
const inputUser = document.querySelector('.login--input--user');
const inputPIN = document.querySelector('.login--input--pin');
const inputTransferTo = document.querySelector('.transfer--input-user');
const inputTransferAmount = document.querySelector('.transfer--input-amount');
const inputLoanAmount = document.querySelector('.request--input-amount');
const inputCloseUser = document.querySelector('.close--input-user');
const inputClosePIN = document.querySelector('.close--input-pin');
// Buttons
const btnLogin = document.querySelector('.login-btn');
const btnTransfer = document.querySelector('.btn--transfer');
const btnReqLoan = document.querySelector('.btn--request');
const btnClose = document.querySelector('.btn--close');
const btnSort = document.querySelector('.btn--sort');

///////////////////////////////////////
// Helper Functions
//////////////////////////////////////

/********************************************************************
 * Description :
 * (function) daysPassed (date1,date2)
 *   Calculate number of days passed between two dates
 * @param date1 -  Earliest date
 * @param date2 -  Lateset date
 *******************************************************************/
const daysPassed = (date1, date2) => {
  return Math.abs(Math.round((date2 - date1) / (1000 * 60 * 60 * 24)));
};
/********************************************************************
 * Description :
 * (function) formatDate (date,locale)
 *   Calcullate number of days passed since this movement operation
 *   and displayed it in certain format and based on locale
 * @param date - Date that will be displayed
 * @param locale - loacle
 *******************************************************************/
const formatDate = function (date, locale) {
  // Current date - Movement date
  const now = new Date();
  const movDate = new Date(date);

  // Get number of days Passed from this movement occurred
  const days = daysPassed(movDate, now);

  if (days === 0)
    return new Intl.DateTimeFormat(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }).format(movDate);

  if (days <= 7) return `${days} DAYS AGO`;
  else return new Intl.DateTimeFormat(locale).format(movDate);
};
/********************************************************************
 * Description :
 * (function) formatCurrency (movement,account)
 *   Format movement currency based on user's locale and curreny of user
 *   account
 * @param movement - movement value that will be formated
 * @param account - current user account
 *******************************************************************/
const formatCurrency = function (movement, account) {
  return new Intl.NumberFormat(account.locale, {
    style: 'currency',
    currency: `${account.currency}`,
  }).format(movement.toFixed(2));
};

///////////////////////////////////////
// Main Functions
//////////////////////////////////////

/********************************************************************
 * Description :
 * (function) createUsername (accounts)
 *   Create username for each user in accounts based on owner's name
 * @param accounts - All accounts of Bank
 *******************************************************************/
const createUsername = function (accounts) {
  accounts.forEach(account => {
    account.username = account.owner
      .split(' ')
      .map(uName => uName.slice(0, 1).toLowerCase())
      .join('');
  });
};
createUsername(accounts);

/********************************************************************
 * Description :
 * (function) displayMovements (account,sort)
 *   Display movements of user with dates and type on UI
 * @param account - current user account
 * @param sort - flag of sort state
 *******************************************************************/
const displayMovementsUI = function (account, sort = false) {
  movementsEl.innerHTML = '';

  const combinedmovesDate = account.movements.map((movement, i) => {
    return { movement, date: account.movementsDates.at(i) };
  });

  if (sort) combinedmovesDate.sort((a, b) => a.movement - b.movement);

  combinedmovesDate.forEach((obj, index) => {
    const { movement, date } = obj;
    const movementType = movement > 0 ? 'deposite' : 'withdrawal';
    let html = ` 
     <div class="movement">
        <div>
           <span class="movement__type movement--${movementType}"> ${
      index + 1
    } ${movementType}
           </span>
            <span class="movement__date">${formatDate(
              date,
              account.locale
            )}</span>
          </div>
           <p class="movement__value">${formatCurrency(movement, account)}</p>
        </div>`;

    movementsEl.insertAdjacentHTML('afterbegin', html);
  });
};
/********************************************************************
 * Description :
 * (function) calcDisplayBalance (account)
 *   calculate total balance of user account and display it in UI
 * @param account - current user account
 *******************************************************************/
const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce((acc, cur) => acc + cur, 0);

  labelBalance.textContent = `${formatCurrency(account.balance, account)}`;
};

/********************************************************************
 * Description :
 * (function) calcSummary (account)
 *   calculate total deposits , withdrawals and interest the display
 *    each of them in UI
 * @param account - current user account
 *******************************************************************/
const calcDisplaySummary = function (account) {
  // Calculate deposites
  const deposite = account.movements
    .filter(movement => movement > 0)
    .reduce((acc, movement) => acc + movement, 0);
  summaryIn.textContent = `${formatCurrency(deposite, account)}`;

  // Calculate Withdrawals
  const withdrawal = account.movements
    .filter(movement => movement < 0)
    .reduce((acc, movement) => acc + movement, 0);
  summaryOut.textContent = `${formatCurrency(Math.abs(withdrawal), account)}`;

  //  Calculate interset
  const interest = account.movements
    .filter(movement => movement > 0)
    .map(movement => (movement * account.interestRate) / 100)
    .filter(movement => movement >= 1)
    .reduce((acc, movement) => acc + movement, 0);
  summaryInterest.textContent = `${formatCurrency(interest, account)}`;
};

/********************************************************************
 * Description :
 * (function) upadteUI (account)
 *   Upadte UI by calculating and display Balance , Summary (deposit - withdrawals - interest)
 *   and movements of surrent user account.
 * @param account - current user account
 *******************************************************************/
const updateUI = function (account) {
  // 1.Calculate balance
  calcDisplayBalance(account);

  // 2.Calculate Summary
  calcDisplaySummary(account);

  // 3.Display Movements
  displayMovementsUI(account);
};
/********************************************************************
 * Description :
 * (function) logoutTimer ()
 *   Count down timer for user session (5 minutes)
 *******************************************************************/
const logoutTimer = function () {
  // Set time to 5 minutes
  let time = 300;

  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(Math.trunc(time % 60)).padStart(2, 0);

    labelTime.textContent = `${min}:${sec}`;

    if (!time) {
      // Log out after 5 minutes
      clearInterval(timer);
      labelWelcome.textContent = `Log in to get started`;
      app.style.opacity = 0;
    }

    time--;
  };
  tick();

  timer = setInterval(tick, 1000);
  return timer;
};

///////////////////////////////////////
// Events Handler
//////////////////////////////////////

/************ LOG-IN BUTTON  *******************/
btnLogin.addEventListener('click', function (e) {
  // Prevent default of submit form
  e.preventDefault();

  // Read input data
  const username = inputUser.value.toLowerCase();
  const pin = +inputPIN.value;

  // Check User existence
  currentAccount = accounts.find(
    account => account.username === username && account.pin === pin
  );

  // Correct credientials --> display UI
  if (currentAccount) {
    // Display UI and welcome message
    app.style.opacity = 1;
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    labelDate.textContent = `As of ${new Intl.DateTimeFormat(
      currentAccount.locale,
      {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      }
    ).format(new Date())}`;

    // Start/Reset Timer
    if (timer) clearInterval(timer);
    timer = logoutTimer();

    updateUI(currentAccount);
  }

  // Clear input fields
  inputUser.value = '';
  inputPIN.value = '';
  inputPIN.blur();
});

/************ TRANSFER BUTTON  *******************/
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const recieveUser = inputTransferTo.value;
  const amount = +inputTransferAmount.value;

  const reciveAccount = accounts.find(
    account => account.username === recieveUser
  );
  if (
    reciveAccount &&
    amount > 0 &&
    amount <= currentAccount.balance &&
    reciveAccount?.username !== currentAccount.username
  ) {
    // Add deposit movement to reciept user
    reciveAccount.movements.push(amount);
    reciveAccount.movementsDates.push(new Date().toISOString());

    // Add withdrawal movement to current user
    currentAccount.movements.push(-amount);
    currentAccount.movementsDates.push(new Date().toISOString());

    // Update current user UI
    updateUI(currentAccount);

    // Reset Timer
    clearInterval(timer);
    timer = logoutTimer();
  }

  // Clear input fields
  inputTransferTo.value = '';
  inputTransferAmount.value = '';
  inputTransferAmount.blur();
});
/************ LOAN BUTTON  *******************/
btnReqLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputLoanAmount.value;
  console.log(typeof amount);

  // Any deposit > 10% of request and amount > 0 --> Apply loan request
  if (
    amount > 0 &&
    currentAccount.movements.some(movement => movement > amount * 0.1)
  ) {
    setTimeout(function () {
      // Add amount to user movements
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update user data
      updateUI(currentAccount);

      // Reset Timer
      clearInterval(timer);
      timer = logoutTimer();
    }, 2500);
  }
  // Clear input fields
  inputLoanAmount.value = '';
  inputLoanAmount.blur();
});
/************ CLOASE ACCOUNT BUTTON  *******************/
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const username = inputCloseUser.value;
  const pin = +inputClosePIN.value;

  if (username === currentAccount.username && pin === currentAccount.pin) {
    const accountNumber = accounts.findIndex(
      account => account.username === username && account.pin === pin
    );

    // Delete Account
    accounts.splice(accountNumber, 1);

    // Logout
    if (timer) clearInterval(timer);
    app.style.opacity = 0;
    labelWelcome.textContent = 'Log in to get started';
  }

  // Clear input fields
  inputCloseUser.value = '';
  inputClosePIN.value = '';
  inputClosePIN.blur();
});
/************ SORT BUTTON  *******************/
// sorted flag
let sorted = false;

btnSort.addEventListener('click', function () {
  displayMovementsUI(currentAccount, !sorted);
  sorted = !sorted;
});
