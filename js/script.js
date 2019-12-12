// Set focus on the first text field
const $userName = $("#name").focus();
// Include a text field and hide it initially
const $otherTitle = $("#other-title").attr("hidden", true);

/*******************************
 *! Job Role
 ******************************/

$("#title").change(e => {
  $("#title>option").each(function() {
    if ($(e.target).val() === "other") {
      $otherTitle.removeAttr("hidden");
    } else {
      $otherTitle.attr("hidden", true);
    }
  });
});

/*******************************
 *! Design
 ******************************/

//! EXCEED EXPECTATION PART - hide "Color" until "Design" is selected
const $color = $("#colors-js-puns").attr("hidden", true);
// the description cannot be chosen by users
const $design = $("#design option:first-child").attr("disabled", true);

// No color options appear until select Design
const $colorTheme = $("#color option")
  .attr("disabled", true)
  .attr("hidden", true);

// T-shirt Design Event Handler
$("#design").change(e => {
  // if a user choose js puns, it only shows related items
  if ($(e.target).val() === "js puns") {
    //! EXCEED EXPECTATION PART
    $color.removeAttr("hidden");
    // only shows items related to js puns
    $('#color option[value="cornflowerblue"]')
      .removeAttr("disabled")
      .removeAttr("hidden")
      .prop("selected", true);
    $('#color option[value="darkslategrey"]')
      .removeAttr("disabled")
      .removeAttr("hidden");
    $('#color option[value="gold"]')
      .removeAttr("disabled")
      .removeAttr("hidden");
    $('#color option[value="tomato"]')
      .attr("disabled", true)
      .attr("hidden", true);
    $('#color option[value="steelblue"]')
      .attr("disabled", true)
      .attr("hidden", true);
    $('#color option[value="dimgrey"]')
      .attr("disabled", true)
      .attr("hidden", true);
  }
  // If a user choose heart js, it only shows related items
  if ($(e.target).val() === "heart js") {
    //! EXCEED EXPECTATION PART
    $color.removeAttr("hidden");
    // Show heart js items
    $('#color option[value="tomato"]')
      .removeAttr("disabled")
      .removeAttr("hidden")
      .prop("selected", true);
    $('#color option[value="steelblue"]')
      .removeAttr("disabled")
      .removeAttr("hidden");
    $('#color option[value="dimgrey"]')
      .removeAttr("disabled")
      .removeAttr("hidden");
    $('#color option[value="cornflowerblue"]')
      .attr("disabled", true)
      .attr("hidden", true);
    $('#color option[value="darkslategrey"]')
      .attr("disabled", true)
      .attr("hidden", true);
    $('#color option[value="gold"]')
      .attr("disabled", true)
      .attr("hidden", true);
  }
});

/*******************************
 *! Activities
 ******************************/
const $activities = $(".activities");
const $checkboxInput = $(".activities input");
// Set initial total cost to 0
let $totalCost = 0;
// Append total cost at the bottom of "Activity" section
const $displayCost = $activities.append(
  `<p class="total-cost">Total: $${$totalCost}</p>`
);

// Activity Event Handler
$activities.change(e => {
  const $clicked = $(e.target);
  const $clickedType = $($clicked).attr("data-day-and-time");
  const $costString = $($clicked).attr("data-cost");
  $costNumber = parseFloat($costString);
  if ($(e.target).prop("checked")) {
    $totalCost += $costNumber;
    $(".total-cost").text(`Total: $ ${$totalCost}`);
  } else {
    $totalCost -= $costNumber;
    $(".total-cost").text(`Total: $ ${$totalCost}`);
  }

  $checkboxInput.each(i => {
    const $checked = $checkboxInput[i];
    const $checkedType = $($checked).attr("data-day-and-time");
    // when two types(day and time) are the same, but the names are different,
    if (
      $checkedType === $clickedType &&
      $($clicked).attr("name") !== $($checked).attr("name")
    ) {
      // if the one is checked, disable other one
      if ($clicked.prop("checked")) {
        $($checked).attr("disabled", true);
        $($checked)
          .parent()
          .css("color", "tomato");
      }
      // if a user unchecks, remove 'disabled'
      else {
        $($checked).removeAttr("disabled");
        $($checked)
          .parent()
          .css("color", "black");
      }
    }
  });
});

/*******************************
 *! Payment
 ******************************/

// Define basic targets
const $payment = $("#payment");
const $creditCard = $("#credit-card");
const $paypal = $("#paypal");
const $bitcoin = $("#bitcoin");

// Set default setting for payment drop-down
const $selectMethod = $("#payment option:first-child").attr("disabled", true);
const $defaultPayment = $('#payment option[value="credit card"').attr(
  "selected",
  true
);
const $defaultSetting = () => {
  $($creditCard).show();
  $($paypal).hide();
  $($bitcoin).hide();
};
// Call the default setting
$defaultSetting();

// Payment Event Handler
$payment.change(e => {
  const $clickedPayment = $(e.target);
  if ($clickedPayment.val() === "credit card") {
    $defaultSetting();
  }
  if ($clickedPayment.val() === "paypal") {
    $($creditCard).hide();
    $($paypal).show();
    $($bitcoin).hide();
  }
  if ($clickedPayment.val() === "bitcoin") {
    $($creditCard).hide();
    $($paypal).hide();
    $($bitcoin).show();
  }
});

/*******************************
 *! Validation
 ******************************/
// Define basic targets
const $name = $("#name");
const $email = $("#mail");
// 'total cost' in 'Activity' has to be targeted in order to unify all error messages
const $activityMessage = $(".total-cost");
const $ccNum = $("#cc-num");
const $zip = $("#zip");
const $cvv = $("#cvv");

// Error message set
const $errorMessage = (message, target) => {
  $(message)
    .insertBefore(target)
    .css("color", "red")
    .css("font-size", ".8em")
    .hide();
};
// Name error message
const $nameBlankError = $errorMessage(
  "<span class='nameBlankError'>*This field can't be blank.</span>",
  $name
);

const $nameLetterError = $errorMessage(
  "<span class='nameLetterError'>*i.e. James Francis(optional) Ryan</span>",
  $name
);

// Email error message
const $emailBlankError = $errorMessage(
  "<span class='emailBlankError'>*This field can't be blank.</span>",
  $email
);

const $emailFormError = $errorMessage(
  "<span class='emailFormError'>*Need a valid email address. (sample@email.com)</span>",
  $email
);
// Activity error message
const $activityError = $errorMessage(
  "<span class='activityError'>*Must select <strong>AT LEAST</strong> one checkbox</span>",
  $activityMessage
);
// Card number error message
const $ccNumError = $errorMessage(
  "<span class='ccNumError'>*Must be 13 - 16 degits.</span>",
  $ccNum
);
// Zip error message
const $zipError = $errorMessage(
  "<span class='zipError'>*Must be 5 degits.</span>",
  $zip
);
// CVV error message
const $cvvError = $errorMessage(
  "<span class='cvvError'>*Must be 3 degits.</span>",
  $cvv
);

// #1. Name Validation
//! REGEX is made by me using 'regex101.com'
const $isValidName = () => {
  const $inputName = $name.val();
  // English name with one middle name allowed
  const $nameTest = /^[A-Z][a-z.]+(([a-zA-Z ])?[A-Z][a-z]*){1,3}$/.test(
    $inputName
  );
  if (!$inputName) {
    $(".nameBlankError").show();
    $(".nameLetterError").hide();
  } else if ($nameTest === false) {
    $(".nameLetterError").show();
    $(".nameBlankError").hide();
  } else {
    $(".nameBlankError").hide();
    $(".nameLetterError").hide();
  }
  return $nameTest;
};

// #2. Email Validation
const $isValidEmail = () => {
  const $inputEmail = $email.val();
  const $emailTest = /^[a-zA-Z][a-zA-z0-9 .]+@\w+\.[a-zA-Z]{2,}$/.test(
    $inputEmail
  );
  if (!$inputEmail) {
    $(".emailBlankError").show();
    $(".emailFormError").hide();
  } else if ($emailTest === false) {
    $(".emailBlankError").hide();
    $(".emailFormError").show();
  } else {
    $(".emailBlankError").hide();
    $(".emailFormError").hide();
  }
  return $emailTest;
};

// #3. Activity Validation
const $isActivityChecked = () => {
  const $isChecked = [];
  // when there's any change, roop through all targets and put items that are 'checked' into the array
  $checkboxInput.each(i => {
    if ($($checkboxInput[i]).prop("checked")) {
      $isChecked.push($checkboxInput[i]);
    }
  });
  // when the roop is done, check if there's any checkbox that is checked and return results
  if ($isChecked.length > 0) {
    $(".activityError").hide();
    return true;
  } else {
    $(".activityError").show();
    return false;
  }
};

// #4. Credit Card Number Validation
const $isValidCcNum = () => {
  const $inputCcNum = $ccNum.val();
  const $ccNumTest = /^\d{13,16}$/.test($inputCcNum);
  if ($ccNumTest) {
    $(".ccNumError").hide();
  } else {
    $(".ccNumError").show();
  }
  return $ccNumTest;
};
// #5. Zip Code Validation
const $isValidZip = () => {
  const $inputZip = $zip.val();
  const $zipTest = /^\d{5}$/.test($inputZip);
  if ($zipTest) {
    $(".zipError").hide();
  } else {
    $(".zipError").show();
  }
  return $zipTest;
};
// #6. CVV Validation
const $isValidCvv = () => {
  const $inputCvv = $cvv.val();
  const $cvvTest = /^\d{3}$/.test($inputCvv);
  if ($cvvTest) {
    $(".cvvError").hide();
  } else {
    $(".cvvError").show();
  }
  return $cvvTest;
};
//! Credit Card Validation is TRUE when #1. Credit Card Payment is selected and the every part is TRUE OR #2. Credit Card Payment is not selected.
const $isValidCc = () => {
  const $optionCreditCard = $("#payment option[value='credit card']");
  if (
    $optionCreditCard.prop("selected") &&
    $isValidCcNum() &&
    $isValidZip() &&
    $isValidCvv()
  ) {
    return true;
  } else if (!$optionCreditCard.prop("selected")) {
    return true;
  }
  // if any one of these is not true, re-run the validation(print-out messages) processes and return 'false'
  else {
    $isValidCcNum();
    $isValidZip();
    $isValidCvv();
    return false;
  }
};

//! FOR EXCEED EXPECTAION - REALTIME SEARCH
const $realtimeValName = $name.keyup(() => {
  $isValidName();
});
const $realtimeValEmail = $email.keyup(() => {
  $isValidEmail();
});
const $realtimeValActivity = $activities.change(() => {
  $isActivityChecked();
});
const $realtimeValCcNum = $ccNum.keyup(() => {
  $isValidCcNum();
});
const $realtimeValZip = $zip.keyup(() => {
  $isValidZip();
});
const $realtimeValCvv = $cvv.keyup(() => {
  $isValidCvv();
});
// Submit Event Handler
const $submit = $("form").submit(e => {
  // if any of the validations is false,
  if (
    !$isValidName() ||
    !$isValidEmail() ||
    !$isActivityChecked() ||
    !$isValidCc()
  ) {
    // prevent 'submit' and re-run all the validations (to print-out all error messages)
    e.preventDefault();
    $isValidName();
    $isValidEmail();
    $isActivityChecked();
    $isValidCc();
  }
});
