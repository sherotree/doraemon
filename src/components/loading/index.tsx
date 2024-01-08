import './index.css';

const Loading = (props: any) => {
  const { content } = props;

  return (
    <div className="flex w-40 flex-col justify-center">
      <div className="typing-indicator">
        <div className="typing-circle"></div>
        <div className="typing-circle"></div>
        <div className="typing-circle"></div>
        <div className="typing-shadow"></div>
        <div className="typing-shadow"></div>
        <div className="typing-shadow"></div>
      </div>
      <div className="mt-2 flex justify-center text-center text-sm text-gray-500">{content}</div>
    </div>
  );
};

export default Loading;
