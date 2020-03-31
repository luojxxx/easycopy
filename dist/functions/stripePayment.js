"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stripePayment = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _stripe = _interopRequireDefault(require("stripe"));

var stripe = (0, _stripe["default"])(process.env.STRIPE_KEY);

var stripePayment = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(amount) {
    var paymentIntent;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return stripe.paymentIntents.create({
              amount: Math.floor(amount),
              currency: "usd",
              statement_descriptor: "Donation",
              payment_method_types: ["card"],
              // Verify your integration in this guide by including this parameter
              metadata: {
                integration_check: "accept_a_payment"
              }
            });

          case 2:
            paymentIntent = _context.sent;
            return _context.abrupt("return", {
              status: 200,
              body: {
                clientSecret: paymentIntent.client_secret
              }
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function stripePayment(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.stripePayment = stripePayment;