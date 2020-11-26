// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');

const userConfig = vscode.workspace.getConfiguration();

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	function openMenu(menu) {
		vscode.commands.executeCommand("setContext", "better-touch-bar:menu", menu);
	}

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "better-touch-bar" is now active!');

	// Remove default buttons
	userConfig.update("keyboard.touchbar.ignored", ["workbench.action.navigateBack", "workbench.action.navigateForward", "workbench.action.debug.start", "workbench.action.debug.run"], true)
	openMenu("main")

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let previousTab = vscode.commands.registerCommand('better-touch-bar.tabNav.previous', function () {
		vscode.commands.executeCommand("workbench.action.previousEditorInGroup");
	});

	let nextTab = vscode.commands.registerCommand('better-touch-bar.tabNav.next', function () {
		vscode.commands.executeCommand("workbench.action.nextEditorInGroup");
	});

	let cancel = vscode.commands.registerCommand('better-touch-bar.cancel', function () {
		openMenu("main")
	});

	let runMain = vscode.commands.registerCommand('better-touch-bar.run.main', function () {
		let folders = vscode.workspace.workspaceFolders
		if (folders != undefined) {
			if (fs.existsSync(folders[0].uri.fsPath + "/.wpilib")) {
				openMenu("run")
				return;
			}
		}
		vscode.commands.executeCommand("workbench.action.debug.run");
	});

	let runBuild = vscode.commands.registerCommand('better-touch-bar.run.build', function () {
		vscode.commands.executeCommand("wpilibcore.buildCode");
		openMenu("main")
	});

	let runDeploy = vscode.commands.registerCommand('better-touch-bar.run.deploy', function () {
		vscode.commands.executeCommand("wpilibcore.deployCode");
		openMenu("main")
	});

	let runStartRioLog = vscode.commands.registerCommand('better-touch-bar.run.startRioLog', function () {
		vscode.commands.executeCommand("wpilibcore.startRioLog");
		openMenu("main")
	});

	let runSimulate = vscode.commands.registerCommand('better-touch-bar.run.simulate', function () {
		vscode.commands.executeCommand("wpilibcore.simulateCode");
		openMenu("main")
	});

	let runStartTool = vscode.commands.registerCommand('better-touch-bar.run.startTool', function () {
		vscode.commands.executeCommand("wpilibcore.startTool");
		openMenu("main")
	});

	let branch = vscode.commands.registerCommand('better-touch-bar.git.branch', function () {
		openMenu("git")
	});

	let checkout = vscode.commands.registerCommand('better-touch-bar.git.checkout', function () {
		vscode.commands.executeCommand("git.checkout");
	});

	let merge = vscode.commands.registerCommand('better-touch-bar.git.merge', function () {
		vscode.commands.executeCommand("git.merge");
	});

	let reset = vscode.commands.registerCommand('better-touch-bar.git.reset', function () {
		vscode.commands.executeCommand("git.cleanAll");
	});

	let pop = vscode.commands.registerCommand('better-touch-bar.git.pop', function () {
		vscode.commands.executeCommand("git.stashPopLatest");
	});

	let stash = vscode.commands.registerCommand('better-touch-bar.git.stash', function () {
		vscode.commands.executeCommand("git.stash");
	});

	let showChanges = vscode.commands.registerCommand('better-touch-bar.git.showChanges', function () {
		vscode.commands.executeCommand("git.openChange");
	});

	let sync = vscode.commands.registerCommand('better-touch-bar.git.sync', function () {
		vscode.commands.executeCommand("git.sync");
	});

	let peek = vscode.commands.registerCommand('better-touch-bar.dev.peek', function () {
		openMenu("peek")
	});

	let peekDefinition = vscode.commands.registerCommand('better-touch-bar.dev.peekDefinition', function () {
		vscode.commands.executeCommand("editor.action.peekDefinition");
		openMenu("main")
	});

	let peekTypeDefinition = vscode.commands.registerCommand('better-touch-bar.dev.peekTypeDefinition', function () {
		vscode.commands.executeCommand("editor.action.peekTypeDefinition");
		openMenu("main")
	});

	let peekImplementations = vscode.commands.registerCommand('better-touch-bar.dev.peekImplementations', function () {
		vscode.commands.executeCommand("editor.action.peekImplementation");
		openMenu("main")
	});

	let peekReferences = vscode.commands.registerCommand('better-touch-bar.dev.peekReferences', function () {
		vscode.commands.executeCommand("editor.action.referenceSearch.trigger");
		openMenu("main")
	});

	let suggest = vscode.commands.registerCommand('better-touch-bar.dev.suggest', function () {
		vscode.commands.executeCommand("editor.action.triggerSuggest");
	});

	context.subscriptions.push(previousTab, nextTab, cancel, runMain, runBuild, runDeploy, runStartRioLog, runSimulate, runStartTool, branch, checkout, merge, reset, pop, stash, showChanges, sync, peek, peekDefinition, peekTypeDefinition, peekImplementations, peekReferences, suggest);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
	// Restore default buttons
	userConfig.update("keyboard.touchbar.ignored", [], true)
}

module.exports = {
	activate,
	deactivate
}
