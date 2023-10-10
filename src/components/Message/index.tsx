import { useEffect, useRef, useState } from 'react';

import './style.less';

export const message: {
  show: (message: MessageProps) => void;
  hide: (key: string) => void;
} = {} as any;

interface MessageProps {
  key?: string;
  title?: string;
  content: string | JSX.Element | JSX.Element[];
  footer?: string | JSX.Element | JSX.Element[];
}

const Index = () => {
  const [messageList, setMessageList] = useState<any[]>([]);

  const messageListRef = useRef(messageList);

  useEffect(() => {
    message.show = ({
      key: _key,
      title,
      content: _content,
      footer: _footer,
    }: MessageProps) => {
      const key = _key || `rkey-${Math.random().toString().split('.')[1]}`;
      let content = _content;
      try {
        if (
          typeof _content !== 'string' &&
          typeof (_content as any)[`${'$$typeof'}`] !== 'symbol'
        ) {
          content = JSON.stringify(_content);
        }
      } catch (e) {}
      let footer = _footer;
      try {
        if (
          typeof _footer !== 'string' &&
          typeof (_footer as any)[`${'$$typeof'}`] !== 'symbol'
        ) {
          footer = JSON.stringify(_footer);
        }
      } catch (e) {}
      messageListRef.current = [
        ...messageListRef.current,
        {
          key,
          title,
          content,
          footer,
        },
      ];
      setMessageList(messageListRef.current);
    };
    message.hide = (key: string) => {
      messageListRef.current = messageListRef.current.filter(
        (v) => v.key !== key,
      );
      setMessageList(messageListRef.current);
    };
  }, []);

  return (
    <>
      {messageList.map((msg) => (
        <div key={msg.key} className="message-shadow">
          <div className="message-card">
            <div className="message-card-title">
              <span>{msg.title || '提示'}</span>
            </div>
            <div className="message-card-content">
              {typeof msg.content === 'string' ? (
                <span>{msg.content}</span>
              ) : (
                msg.content
              )}
            </div>
            <div className="message-card-footer">
              {msg.footer || (
                <div className="button-group">
                  <button
                    className="button button-form"
                    onClick={() => {
                      messageListRef.current = messageList.filter(
                        (v) => v.key !== msg.key,
                      );
                      setMessageList(messageListRef.current);
                    }}
                  >
                    关闭
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Index;
