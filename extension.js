// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');

const userConfig = vscode.workspace.getConfiguration();

const defaultButtons = ["workbench.action.navigateBack", "workbench.action.navigateForward", "workbench.action.debug.start", "workbench.action.debug.run"]
const mainButtons = ["better-touch-bar.run.main", "better-touch-bar.git.showChanges", "better-touch-bar.git.stageAll", "better-touch-bar.git.sync", "better-touch-bar.dev.quickFix", "better-touch-bar.dev.suggest"]
const runButtons = ["better-touch-bar.run.cancel", "better-touch-bar.run.build", "better-touch-bar.run.deploy", "better-touch-bar.run.startRioLog", "better-touch-bar.run.simulate", "better-touch-bar.run.startTool"]


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "better-touch-bar" is now active!');

	// Remove default buttons
	userConfig.update("keyboard.touchbar.ignored", defaultButtons.concat(runButtons), true)

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
				userConfig.update("keyboard.touchbar.ignored", defaultButtons.concat(mainButtons), true)
				return;
			}
		}
		vscode.commands.executeCommand("workbench.action.debug.run");
	});

	let runCancel = vscode.commands.registerCommand('better-touch-bar.run.cancel', function () {
		userConfig.update("keyboard.touchbar.ignored", defaultButtons.concat(runButtons), true)
	});

	let runBuild = vscode.commands.registerCommand('better-touch-bar.run.build', function () {
		vscode.commands.executeCommand("wpilibcore.buildCode");
		userConfig.update("keyboard.touchbar.ignored", defaultButtons.concat(runButtons), true)
	});

	let runDeploy = vscode.commands.registerCommand('better-touch-bar.run.deploy', function () {
		vscode.commands.executeCommand("wpilibcore.deployCode");
		userConfig.update("keyboard.touchbar.ignored", defaultButtons.concat(runButtons), true)
	});

	let runStartRioLog = vscode.commands.registerCommand('better-touch-bar.run.startRioLog', function () {
		vscode.commands.executeCommand("wpilibcore.startRioLog");
		userConfig.update("keyboard.touchbar.ignored", defaultButtons.concat(runButtons), true)
	});

	let runSimulate = vscode.commands.registerCommand('better-touch-bar.run.simulate', function () {
		vscode.commands.executeCommand("wpilibcore.simulateCode");
		userConfig.update("keyboard.touchbar.ignored", defaultButtons.concat(runButtons), true)
	});

	let runStartTool = vscode.commands.registerCommand('better-touch-bar.run.startTool', function () {
		vscode.commands.executeCommand("wpilibcore.startTool");
		userConfig.update("keyboard.touchbar.ignored", defaultButtons.concat(runButtons), true)
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
