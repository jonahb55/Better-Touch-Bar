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

	let runCancel = vscode.commands.registerCommand('better-touch-bar.run.cancel', function () {
		openMenu("main")
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

	let showChanges = vscode.commands.registerCommand('better-touch-bar.git.showChanges', function () {
		vscode.commands.executeCommand("git.openChange");
	});

	let stageAll = vscode.commands.registerCommand('better-touch-bar.git.stageAll', function () {
		vscode.commands.executeCommand("workbench.scm.focus");
		vscode.commands.executeCommand("git.stageAll");
	});

	let sync = vscode.commands.registerCommand('better-touch-bar.git.sync', function () {
		vscode.commands.executeCommand("git.sync");
	});

	let quickFix = vscode.commands.registerCommand('better-touch-bar.dev.quickFix', function () {
		vscode.commands.executeCommand("editor.action.quickFix");
	});

	let suggest = vscode.commands.registerCommand('better-touch-bar.dev.suggest', function () {
		vscode.commands.executeCommand("editor.action.triggerSuggest");
	});

	context.subscriptions.push(previousTab, nextTab, runMain, runCancel, runBuild, runDeploy, runStartRioLog, runSimulate, runStartTool, showChanges, stageAll, sync, quickFix, suggest);
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
