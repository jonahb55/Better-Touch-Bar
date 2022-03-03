const vscode = require("vscode")
const fs = require("fs")
const cp = require("child_process")

const wpilibEventBranchPrefix = "event"
const userConfig = vscode.workspace.getConfiguration()

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	function openMenu(menu) {
		vscode.commands.executeCommand("setContext", "better-touch-bar:menu", menu)
	}

	// Remove default buttons
	userConfig.update("keyboard.touchbar.ignored", ["workbench.action.navigateBack", "workbench.action.navigateForward", "workbench.action.debug.start", "workbench.action.debug.run", "workbench.action.debug.pause", "workbench.action.debug.stepOver", "workbench.action.debug.stepInto", "workbench.action.debug.stepOut"], true)
	openMenu("main")

	let previousTab = vscode.commands.registerCommand("better-touch-bar.tabNav.previous", function () {
		vscode.commands.executeCommand("workbench.action.previousEditorInGroup")
	})

	let nextTab = vscode.commands.registerCommand("better-touch-bar.tabNav.next", function () {
		vscode.commands.executeCommand("workbench.action.nextEditorInGroup")
	})

	let cancel = vscode.commands.registerCommand("better-touch-bar.cancel", function () {
		openMenu("main")
	})

	let runMain = vscode.commands.registerCommand("better-touch-bar.run.main", function () {
		let folders = vscode.workspace.workspaceFolders
		if (folders != undefined) {
			if (fs.existsSync(folders[0].uri.fsPath + "/.wpilib")) {
				cp.exec("git branch --show-current", { cwd: vscode.workspace.workspaceFolders[0].uri.fsPath }, (err, stdout, stderr) => {
					vscode.commands.executeCommand("setContext", "better-touch-bar:wpilib-event", stdout.startsWith(wpilibEventBranchPrefix))
					openMenu("run-wpilib")
				})
				return
			}
		}
		if (vscode.window.activeTextEditor.document.uri.toString().endsWith(".ino")) {
			openMenu("run-arduino")
			return
		}
		vscode.commands.executeCommand("workbench.action.debug.run")
	})

	let runWPILibBuild = vscode.commands.registerCommand("better-touch-bar.run.wpilib.build", function () {
		vscode.commands.executeCommand("wpilibcore.buildCode")
		openMenu("main")
	})

	let runWPILibDeploy = vscode.commands.registerCommand("better-touch-bar.run.wpilib.deploy", function () {
		vscode.commands.executeCommand("wpilibcore.deployCode")
		openMenu("main")
	})

	let runWPILibDeployEvent = vscode.commands.registerCommand("better-touch-bar.run.wpilib.deployEvent", function () {
		vscode.commands.executeCommand("event-deploy.deploy")
		openMenu("main")
	})

	let runWPILibStartRioLog = vscode.commands.registerCommand("better-touch-bar.run.wpilib.startRioLog", function () {
		vscode.commands.executeCommand("wpilibcore.startRioLog")
		openMenu("main")
	})

	let runWPILibSimulate = vscode.commands.registerCommand("better-touch-bar.run.wpilib.simulate", function () {
		vscode.commands.executeCommand("wpilibcore.simulateCode")
		openMenu("main")
	})

	let runWPILibStartTool = vscode.commands.registerCommand("better-touch-bar.run.wpilib.startTool", function () {
		vscode.commands.executeCommand("wpilibcore.startTool")
		openMenu("main")
	})

	let runArduinoBuild = vscode.commands.registerCommand("better-touch-bar.run.arduino.build", function () {
		vscode.commands.executeCommand("arduino.verify")
		openMenu("main")
	})

	let runArduinoDeploy = vscode.commands.registerCommand("better-touch-bar.run.arduino.deploy", function () {
		vscode.commands.executeCommand("arduino.upload")
		openMenu("main")
	})

	let runArduinoLibraries = vscode.commands.registerCommand("better-touch-bar.run.arduino.libraries", function () {
		vscode.commands.executeCommand("arduino.showLibraryManager")
		openMenu("main")
	})

	let runArduinoSerialMonitor = vscode.commands.registerCommand("better-touch-bar.run.arduino.serialMonitor", function () {
		vscode.commands.executeCommand("arduino.openSerialMonitor")
		openMenu("main")
	})

	let displayGit = vscode.commands.registerCommand("better-touch-bar.git.open", function () {
		vscode.commands.executeCommand("workbench.scm.focus")
	})

	let branch = vscode.commands.registerCommand("better-touch-bar.git.branch", function () {
		openMenu("git")
	})

	let checkout = vscode.commands.registerCommand("better-touch-bar.git.checkout", function () {
		vscode.commands.executeCommand("git.checkout")
	})

	let merge = vscode.commands.registerCommand("better-touch-bar.git.merge", function () {
		vscode.commands.executeCommand("git.merge")
	})

	let reset = vscode.commands.registerCommand("better-touch-bar.git.reset", function () {
		vscode.commands.executeCommand("git.cleanAll")
	})

	let pop = vscode.commands.registerCommand("better-touch-bar.git.pop", function () {
		vscode.commands.executeCommand("git.stashPopLatest")
	})

	let stash = vscode.commands.registerCommand("better-touch-bar.git.stash", function () {
		vscode.commands.executeCommand("git.stash")
	})

	let sync = vscode.commands.registerCommand("better-touch-bar.git.sync", function () {
		vscode.commands.executeCommand("git.sync")
	})

	let rename = vscode.commands.registerCommand("better-touch-bar.dev.rename", function () {
		vscode.commands.executeCommand("editor.action.rename")
	})

	let find = vscode.commands.registerCommand("better-touch-bar.dev.find", function () {
		openMenu("find")
	})

	let findDefinition = vscode.commands.registerCommand("better-touch-bar.dev.findDefinition", function () {
		vscode.commands.executeCommand("editor.action.revealDefinition")
		openMenu("main")
	})

	let findTypeDefinition = vscode.commands.registerCommand("better-touch-bar.dev.findTypeDefinition", function () {
		vscode.commands.executeCommand("editor.action.goToTypeDefinition")
		openMenu("main")
	})

	let findImplementations = vscode.commands.registerCommand("better-touch-bar.dev.findImplementations", function () {
		vscode.commands.executeCommand("editor.action.goToImplementation")
		openMenu("main")
	})

	let findReferences = vscode.commands.registerCommand("better-touch-bar.dev.findReferences", function () {
		vscode.commands.executeCommand("editor.action.goToReferences")
		openMenu("main")
	})

	let quickFix = vscode.commands.registerCommand("better-touch-bar.dev.quickFix", function () {
		vscode.commands.executeCommand("editor.action.quickFix")
	})

	context.subscriptions.push(previousTab, nextTab, cancel, runMain, runWPILibBuild, runWPILibDeploy, runWPILibDeployEvent, runWPILibStartRioLog, runWPILibSimulate, runWPILibStartTool, runArduinoBuild, runArduinoDeploy, runArduinoLibraries, runArduinoSerialMonitor, displayGit, branch, checkout, merge, reset, pop, stash, sync, rename, find, findDefinition, findTypeDefinition, findImplementations, findReferences, quickFix)
}
// @ts-ignore
exports.activate = activate

function deactivate() {
	// Restore default buttons
	userConfig.update("keyboard.touchbar.ignored", [], true)
}

module.exports = {
	activate,
	deactivate
}
