const LandingPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: Poppins, sans-serif;
  margin: 2rem;
`;

const Title = styled.h1`
  color: var(--FFFFFF, #fff);
  font-family: Poppins;
  font-size: 40px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 48px */
  letter-spacing: -1.6px;
  align-self: stretch;
  margin-bottom: 32px;
`;

const SubTitle = styled.h1`
  color: #fff;
  font-family: Poppins;
  font-size: 28px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 33.6px */
  letter-spacing: -1.12px;
  margin-bottom: 24px;
`;

// const Button = styled.button`
//   padding: 1rem 2rem;
//   font-size: 1.2rem;
//   background-color: #007bff;
//   color: #fff;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: #0056b3;
//   }
// `;

const BosWorkspaceInfo = styled.p`
  color: var(--E8E8E8, #e8e8e8);
  font-family: Poppins;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const CodeSnippet = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 16px;
  width: max-content;
  margin: 1rem 2rem;
`;

return (
  <LandingPageContainer>
    <Title>BOS Workspace Overview</Title>
    <BosWorkspaceInfo>
      bos-workspace is a comprehensive toolset designed to simplify the development and deployment
      of NEAR components and applications. With support for hot reload, TypeScript, and multiple app
      management, it caters to developers looking for an efficient and scalable developer
      environment.
    </BosWorkspaceInfo>
    <SubTitle>Quickstart</SubTitle>
    <BosWorkspaceInfo>
      To begin, either use this template repository or install bos-workspace within an existing
      project:
    </BosWorkspaceInfo>
    <CodeSnippet>yarn add -D bos-workspace</CodeSnippet>
    <BosWorkspaceInfo>Then, you can clone widgets from an existing account via:</BosWorkspaceInfo>
    <CodeSnippet>bos-workspace clone [accountId]</CodeSnippet>
    <BosWorkspaceInfo>Or ensure the proper workspace structure and usage.</BosWorkspaceInfo>
  </LandingPageContainer>
);
