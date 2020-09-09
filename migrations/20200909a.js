module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("ResetPasswordTokens", "email", {
        type: Sequelize.STRING,
        allowNull: false,
      }),

      queryInterface.removeIndex("Urls", "Urls_urlRaw"),
      queryInterface.removeIndex("Urls", "Urls_userId"),
      queryInterface.addIndex("Users", {
        fields: ["email"],
      }),
      queryInterface.addIndex("Users", {
        fields: ["emailVerifying"],
      }),

      queryInterface.addConstraint("Urls", {
        fields: ["urlRaw"],
        type: "unique",
      }),
      queryInterface.addConstraint("Urls", {
        fields: ["userId"],
        type: "unique",
      }),
      queryInterface.addIndex("Urls", {
        fields: ["expiredAt"],
      }),

      queryInterface.addConstraint("UserTokens", {
        fields: ["userId"],
        type: "unique",
      }),
      queryInterface.addConstraint("UserTokens", {
        fields: ["userToken"],
        type: "unique",
      }),

      queryInterface.addConstraint("EmailVerificationTokens", {
        fields: ["userId"],
        type: "unique",
      }),
      queryInterface.addConstraint("EmailVerificationTokens", {
        fields: ["verificationToken"],
        type: "unique",
      }),

      queryInterface.addConstraint("ResetPasswordTokens", {
        fields: ["email"],
        type: "unique",
      }),
      queryInterface.addConstraint("ResetPasswordTokens", {
        fields: ["resetPasswordToken"],
        type: "unique",
      }),

      queryInterface.addConstraint("RecaptchaTokens", {
        fields: ["recaptchaToken"],
        type: "unique",
      }),
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeIndex("Users", "users_email"),
      queryInterface.removeIndex("Users", "users_email_verifying"),

      queryInterface.removeConstraint("Urls", "Urls_urlRaw_uk"),
      queryInterface.removeConstraint("Urls", "Urls_userId_uk"),
      queryInterface.removeIndex("Urls", "urls_expired_at"),

      queryInterface.removeConstraint("UserTokens", "UserTokens_userId_uk"),
      queryInterface.removeConstraint("UserTokens", "UserTokens_userToken_uk"),

      queryInterface.removeConstraint(
        "EmailVerificationTokens",
        "EmailVerificationTokens_userId_uk"
      ),
      queryInterface.removeConstraint(
        "EmailVerificationTokens",
        "EmailVerificationTokens_verificationToken_uk"
      ),

      queryInterface.removeConstraint(
        "ResetPasswordTokens",
        "ResetPasswordTokens_email_uk"
      ),
      queryInterface.removeConstraint(
        "ResetPasswordTokens",
        "ResetPasswordTokens_resetPasswordToken_uk"
      ),

      queryInterface.removeConstraint(
        "RecaptchaTokens",
        "RecaptchaTokens_recaptchaToken_uk"
      ),
    ]);
  },
};
