QUnit.config.autostart = false;

// import all your OPA tests here
void Promise.all([
	import("ui5/walkthrough/test/integration/NavigationJourney")
]).then(() => {
	QUnit.start();
});