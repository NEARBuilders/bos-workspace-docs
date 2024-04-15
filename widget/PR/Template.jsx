const Container = styled.div`
  display: flex;
  height: 100%;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
`;

return ({ layout, theme, blocks, children }) => {
  
  const { Layout } = VM.require(layout?.src ?? "${alias_devs}/widget/Layout") || {
    Layout: () => <></>,
  };

  return (
    <Container style={theme} id="template-container">
      <Layout
        {...(layout?.initialProps ?? { variant: "standard" })}
        blocks={blocks}
      >
        {children}
      </Layout>
    </Container>
  );
};