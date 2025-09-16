import React from "react";
import { ScrollView, Switch } from "react-native";

import Text from "@/designSystem/components/Text";
import { useThemeMode } from "@/designSystem/theme";

import { Container, Section, ThemeSwitchContainer } from "./styles";

const DesignSystemScreen = () => {
  const { themeMode, toggleThemeMode } = useThemeMode();

  return (
    <ScrollView>
      <Container>
        <Section>
          <Text variant="heading" size="lg">
            Troca de Tema
          </Text>
          <ThemeSwitchContainer>
            <Text>Modo Escuro</Text>
            <Switch
              value={themeMode === "dark"}
              onValueChange={toggleThemeMode}
            />
          </ThemeSwitchContainer>
        </Section>

        <Section>
          <Text variant="heading" size="lg">
            Text
          </Text>
          <Text size="xl">Extra Large Text</Text>
          <Text size="lg">Large Text</Text>
          <Text size="md">Medium Text</Text>
          <Text size="sm">Small Text</Text>
          <Text size="xs">Extra Small Text</Text>
        </Section>
      </Container>
    </ScrollView>
  );
};

export default DesignSystemScreen;
