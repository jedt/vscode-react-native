// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.

import { IAttachRequestArgs } from "./debugSessionBase";

export class JsDebugConfigAdapter {
    public static createDebuggingConfigForPureRN(
        attachArgs: IAttachRequestArgs,
        cdpProxyPort: number,
        sessionId: string,
    ): any {
        return Object.assign({}, JsDebugConfigAdapter.getExistingExtraArgs(attachArgs), {
            type: "pwa-node",
            request: "attach",
            name: "Attach",
            continueOnAttach: true,
            port: cdpProxyPort,
            // The unique identifier of the debug session. It is used to distinguish React Native extension's
            // debug sessions from other ones. So we can save and process only the extension's debug sessions
            // in vscode.debug API methods "onDidStartDebugSession" and "onDidTerminateDebugSession".
            rnDebugSessionId: sessionId,
        });
    }

    public static createDebuggingConfigForRNHermes(
        attachArgs: IAttachRequestArgs,
        cdpProxyPort: number,
        sessionId: string,
    ): any {
        return Object.assign({}, JsDebugConfigAdapter.getExistingExtraArgs(attachArgs), {
            type: "pwa-node",
            request: "attach",
            name: "Attach",
            continueOnAttach: true,
            port: cdpProxyPort,
            // The unique identifier of the debug session. It is used to distinguish React Native extension's
            // debug sessions from other ones. So we can save and process only the extension's debug sessions
            // in vscode.debug API methods "onDidStartDebugSession" and "onDidTerminateDebugSession".
            rnDebugSessionId: sessionId,
        });
    }

    private static getExistingExtraArgs(attachArgs: IAttachRequestArgs): any {
        const existingExtraArgs: any = {};
        if (attachArgs.env) {
            existingExtraArgs.env = attachArgs.env;
        }
        if (attachArgs.envFile) {
            existingExtraArgs.envFile = attachArgs.envFile;
        }
        if (attachArgs.sourceMaps) {
            existingExtraArgs.sourceMaps = attachArgs.sourceMaps;
        }
        if (attachArgs.sourceMapPathOverrides) {
            existingExtraArgs.sourceMapPathOverrides = attachArgs.sourceMapPathOverrides;
        }
        if (attachArgs.skipFiles) {
            existingExtraArgs.skipFiles = attachArgs.skipFiles;
        }

        return existingExtraArgs;
    }
}
