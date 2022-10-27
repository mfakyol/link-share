import styled from "@emotion/styled";

function LinkButton({ link, title, style, ...rest }) {
  const Anchor = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    text-align: center;
    word-wrap: break-word;
    line-height: 1.6;
    margin-bottom: 16px;
    padding: 0 16px; 
    ${style}
  `;

  return (
    <Anchor rel="noopener noreferrer" target="_blank" href={link} {...rest}>
      {title}
    </Anchor>
  );
}

export default LinkButton;
