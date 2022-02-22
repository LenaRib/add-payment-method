# add-payment-method

#1 Test case: Add and Edit Payment method

Requirement: #1. Control my payment method

Pre-conditions: on  Settings → Billing and Products page first billing should be in invoice (default) payment method . Should be one or more card added.

Test data: credentials and billing details are stored in  file

Steps to be executed:

1. Visit [https://stage.my.osome.club/](https://stage.my.osome.club/)
2. login with test data
3. navigate to Settings → Billing and Products 
4. click on a subscription to open the sidebar
5. on the sidebar in the ‘payment method’ section click the ‘pencil’ icon
6. current payment method should appear
7. modal window with picker with 2 options should be available
8. check that the radio buttons can be changed from invoice to payment method and from payment method to invoice
9. click on the 'change' button, check that request with 'POST','/api/v2/payment' was sended, response 200 
10. add a new card with right and wrong details
11. click save check request


or

Check list:

When you change the payment method, the selected method is saved
1.1. From Credit or debit card to Bank transfer
1.2. C Bank transfer to Credit or debit card
When you change the payment method, it changes for all active products
When adding a new card, it is saved and appears in the list of cards
When adding a new card, old cards are not deleted.
When you select a card, it becomes the default payment card
