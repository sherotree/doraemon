export const emit = function (name: string, ...args: any): void {
  window.parent.postMessage(
    {
      pluginMessage: [name, ...args],
      pluginId: 'app-logo-finder',
    },
    '*',
  );
};
