# OrangeHRM Leave Module Test Cases

## Overview
This document describes the Leave Module test scenarios for OrangeHRM. Coverage includes positive, negative, boundary, date validation, security validation, and UI validation checks.

## 1. Positive Scenarios
1.1 Apply for Leave with valid employee, leave type, dates, and comments
- Preconditions: user is logged in and on Leave > Apply page
- Steps:
  1. Select employee from dropdown or auto-suggest
  2. Choose a valid leave type
  3. Set "From" and "To" dates within employee entitlement
  4. Enter valid comment text
  5. Submit application
- Expected:
  - Success message displayed
  - Leave request appears in Pending Approval list
  - Leave dates and type match submitted values

1.2 Apply for partial day leave with valid from and to times
- Preconditions: partial day option is available
- Steps:
  1. Select a valid leave type
  2. Select same date for from/to
  3. Choose morning or afternoon option
  4. Submit leave
- Expected:
  - Success message displayed
  - Leave request status is Pending Approval

1.3 Search leave list by employee and date range
- Steps:
  1. Navigate to Leave > Leave List
  2. Enter valid employee name
  3. Enter valid date range
  4. Click search
- Expected:
  - Results are filtered correctly
  - Returned rows contain the requested employee and fall within selected dates

1.4 Cancel leave request before approval
- Preconditions: a pending leave request exists
- Steps:
  1. Select pending leave request
  2. Click cancel or withdraw
  3. Confirm cancellation
- Expected:
  - Request is removed from pending list or status changes to Canceled
  - Success confirmation appears

## 2. Negative Scenarios
2.1 Apply leave without selecting employee
- Steps:
  1. Leave employee selection blank
  2. Set valid leave type and dates
  3. Submit
- Expected: validation error prompting employee selection

2.2 Apply leave without selecting leave type
- Steps:
  1. Choose an employee
  2. Leave leave type blank
  3. Set valid dates
  4. Submit
- Expected: validation error for leave type

2.3 Apply leave without start date
- Steps:
  1. Select employee and leave type
  2. Leave From date blank
  3. Enter valid To date
  4. Submit
- Expected: date validation error for the From field

2.4 Apply leave without end date
- Steps:
  1. Select employee and leave type
  2. Enter valid From date
  3. Leave To date blank
  4. Submit
- Expected: date validation error for the To field

2.5 Apply leave with To date before From date
- Steps:
  1. Select employee and leave type
  2. Set From date to a later date than To date
  3. Submit
- Expected: validation error indicating invalid date range

2.6 Apply leave with invalid employee name
- Steps:
  1. Enter employee name that does not exist
  2. Submit leave request
- Expected: user-friendly message stating employee not found or no matching employee

2.7 Approve or reject leave without permission
- Steps:
  1. Login as user without leave approval rights
  2. Attempt to access leave approval controls
- Expected: permission denied or controls disabled

## 3. Boundary Conditions
3.1 Apply leave for minimum allowed duration
- Steps:
  1. Select same From and To date
  2. Submit valid leave request
- Expected: leave request accepted if rules allow single-day leave

3.2 Apply leave for maximum allowed duration
- Steps:
  1. Enter From and To dates at the upper limit of entitlement or policy
  2. Submit
- Expected: request accepted if within policy; otherwise appropriate policy validation

3.3 Apply leave using boundary date values
- Steps:
  1. Use earliest supported calendar date
  2. Use latest supported calendar date
  3. Submit
- Expected: system accepts supported dates and rejects unsupported ones with clear validation

3.4 Apply leave on start/end of current year or month count boundaries
- Steps:
  1. Choose dates on year boundary or month boundary
  2. Submit request
- Expected: submission flows without date boundary errors

## 4. Date Validation
4.1 Prevent future date leave beyond allowed policy window
- Steps:
  1. Set From/To dates outside allowed future window
  2. Submit
- Expected: validation message for disallowed future date range

4.2 Prevent backdated leave past allowed history window
- Steps:
  1. Set From/To dates older than the allowed backdate policy
  2. Submit
- Expected: validation error or rejection with correct messaging

4.3 Prevent invalid calendar entry input
- Steps:
  1. Manually enter invalid date string or malformed date
  2. Submit
- Expected: date-picker rejects invalid format or shows error before submit

4.4 Prevent non-working day leave for restricted leave type
- Steps:
  1. Select leave type that disallows weekends/holidays
  2. Choose weekend or holiday dates
  3. Submit
- Expected: validation disallows the selected days or asks to choose working days only

4.5 Validate date range overlaps with existing approved leave
- Steps:
  1. Create or identify approved leave for a date range
  2. Attempt to apply overlapping new leave date range
  3. Submit
- Expected: conflict validation prevents overlapping leave if the business rule requires it

## 5. Security Validation
5.1 Verify only authorized users can access Leave module
- Steps:
  1. Login as user without Leave permissions
  2. Attempt to navigate to Leave menu
- Expected: menu hidden or access denied

5.2 Verify unauthorized users cannot submit leave requests for others
- Steps:
  1. Login as normal employee
  2. Attempt to apply leave on behalf of another employee
- Expected: request blocked or not allowed by UI/authorization

5.3 Verify input sanitization for comments and fields
- Steps:
  1. Enter HTML/script characters in comments or custom fields
  2. Submit leave request
- Expected: text is treated as plain text, no script execution, and the content is safely displayed or escaped

5.4 Verify leave approval actions require proper role
- Steps:
  1. Attempt leave approval as a non-approver
  2. Confirm action is blocked
- Expected: permission error or hidden approval actions

5.5 Verify API or direct request protection for leave apply endpoints
- Steps:
  1. Attempt to submit leave request via crafted API/direct request without valid auth or roles
- Expected: server rejects request with 401/403 or similar authorization failure

## 6. UI Validation
6.1 Verify Leave menu and submenus display correctly
- Steps:
  1. Open application
  2. Navigate to Leave menu
- Expected: main menu and Leave submenus are visible and labeled correctly

6.2 Verify form labels and placeholders for leave application
- Steps:
  1. Open Apply Leave page
- Expected:
  - Employee field label and placeholder text present
  - Leave type label and date labels visible
  - Comment field label visible

6.3 Verify date picker control opens and selects date correctly
- Steps:
  1. Click From and To fields
  2. Select a date using the picker UI
- Expected: calendar UI appears, selected date populates the field, and invalid/non-supported dates are disabled if applicable

6.4 Verify error messages appear inline and clearly
- Steps:
  1. Submit invalid leave request
- Expected: validation messages appear near relevant fields, are readable, and use consistent styling

6.5 Verify responsive layout of Leave pages
- Steps:
  1. Open Leave pages on different viewport sizes (desktop, tablet, mobile)
- Expected: page layout remains usable and menu/form elements do not overlap or disappear

6.6 Verify leave list filter UI remains stable after search
- Steps:
  1. Use filters on Leave List
  2. Verify filter values remain set after results load
- Expected: filter inputs preserve selected values and table results update correctly

## 7. Notes
- Adjust scenario details to fit specific OrangeHRM version and custom leave policies.
- Validate whether the application uses employee self-service vs. administrator leave application flows and update test inputs accordingly.
- For automated tests, use stable selectors on labels, data attributes, or field names.
