import { NodeEntry, NodesApi, AlfrescoApi, AlfrescoApiConfig } from '@alfresco/js-api';

export class FolderApi {

    private api: AlfrescoApi;
    private nodes: NodesApi;

    constructor(host: string, private username: string, private password: string) {
        this.api = this.createApiService(host, username, password);
        this.nodes = new NodesApi(this.api);
    }

    public async login() {
        try {
            return this.api.login(this.username, this.password);
        } catch (e) {
            debugger;
            console.log('Login failed');
            throw e;
        }
    }

    public async create(folderName: string): Promise<NodeEntry> {
        return this.nodes.createNode('-my-', { name: folderName, nodeType: 'cm:folder', }, {});
    }

    public async delete(folderUuid: string): Promise<NodeEntry> {
        return this.nodes.deleteNode(folderUuid);
    }

    private createApiService(host: string, username: string, password: string) {
        return new AlfrescoApi(new AlfrescoApiConfig({
            log: 'TRACE',
            hostEcm: host,
            hostBpm: host,
            identityHost: `${host}/auth/admin/realms/alfresco`,
            provider: 'ALL',
            authType: 'OAUTH',
            oauth2: {
                'host': `${host}/auth/realms/alfresco`,
                'clientId': 'alfresco',
                'scope': "openid",
                'secret': '',
                'implicitFlow': false,
                'silentLogin': true,
                'redirectUri': '/',
                'redirectUriLogout': '/',
                'redirectSilentIframeUri': `${host}/assets/silent-refresh.html`,
                'publicUrls': [
                    "**/logout",
                    "**/preview/s/*",
                    "**/settings"
                ]
            }
        }));
    }
}
