interface ICommentsProps {
  repositoryName: string;
}

const Comments: React.FC<ICommentsProps> = ({ repositoryName }) => {
  return (
    <section
      ref={elem => {
        if (!elem) {
          return;
        }
        const scriptElem = document.createElement('script');
        scriptElem.src = 'https://utteranc.es/client.js';
        scriptElem.async = true;
        scriptElem.crossOrigin = 'anonymous';
        scriptElem.setAttribute('repo', repositoryName);
        scriptElem.setAttribute('issue-term', 'pathname');
        scriptElem.setAttribute('label', 'blog-comment');
        scriptElem.setAttribute('theme', 'github-dark');
        elem.appendChild(scriptElem);
      }}
    />
  );
};

export default Comments;
