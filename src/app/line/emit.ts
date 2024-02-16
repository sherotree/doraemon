export const emit = function (name: string, ...args: any): void {
  window.parent.postMessage(
    {
      pluginMessage: [name, ...args],
      pluginId: 'Uwarp Line Chart',
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
