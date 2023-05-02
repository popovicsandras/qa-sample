module.exports.config = {
    specs: ['*.spec.ts'],
    framework: 'jasmine',
    directConnect: true,

    onPrepare: () => {
        browser.manage().window().setSize(1024, 800);
        browser.waitForAngularEnabled(false);
        const SpecReporter = require('jasmine-spec-reporter');
        jasmine
            .getEnv()
            .addReporter(new SpecReporter({ displayStacktrace: 'specs' }));
    },

    allScriptsTimeout: 30000,
    capabilities: {
        browserName: 'chrome',
        shardTestFiles: false,
        maxInstances: 1,
        chromeOptions: {
            args: [
                '--disable-infobars',
                '--disable-extensions',
                'verbose',
                'log-path=/tmp/chromedriver.log',
            ],
            prefs: {
                'profile.password_manager_enabled': false,
                credentials_enable_service: false,
                password_manager_enabled: false,
            },
        },
    },

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 10000,
        displaySpecDuration: true,
        print: () => {}
    }
};
