export const emit = function (name: string, ...args: any): void {
  window.parent.postMessage(
    {
      pluginMessage: [name, ...args],
      pluginId: '1327873417658338157',
    },
    '*',
  );
};
