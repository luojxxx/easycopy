require("dotenv").config();

import { DBSetup, DBClear } from './MockDB'
import AccountManagementTests from './testSuites/AccountManagement'
import AccountFeaturesTests from './testSuites/AccountFeatures'
import UrlTests from "./testSuites/Urls";
import RecaptchaTests from './testSuites/Recaptcha'
import SubscriptionTests from './testSuites/Subscription'

AccountManagementTests()
AccountFeaturesTests()
UrlTests();
RecaptchaTests();
SubscriptionTests();
