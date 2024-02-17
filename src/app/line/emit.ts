export const emit = function (name: string, ...args: any): void {
  window.parent.postMessage(
    {
      pluginMessage: [name, ...args],
      pluginId: '1340557036755846279',
    },
    '*',
  );
};

export const on = function (name: string, callback: (data: any) => void): void {
  window.addEventListener('message', event => {
    if (event.data.pluginMessage && event.data.pluginMessage[0] === name) {
      callback(event.data.pluginMessage[1]);
    }
  });
};
