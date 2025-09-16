import React, { useState } from "react";
import { ScrollView } from "react-native";

import Button from "@/designSystem/components/Button";
import Switch from "@/designSystem/components/Switch";
import Text from "@/designSystem/components/Text";
import { useThemeMode } from "@/designSystem/theme";

import { Container, Section, SwitchContainer } from "./styles";

const DesignSystemScreen = () => {
  const { themeMode, toggleThemeMode } = useThemeMode();
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <ScrollView>
      <Container>
        <Section>
          <Text variant="heading" size="lg">
            Troca de Tema
          </Text>
          <SwitchContainer>
            <Text>Modo Escuro</Text>
            <Switch
              value={themeMode === "dark"}
              onValueChange={toggleThemeMode}
            />
          </SwitchContainer>
        </Section>

        <Section>
          <Text variant="heading" size="lg">
            State Toggles
          </Text>
          <SwitchContainer>
            <Text>Loading</Text>
            <Switch value={isLoading} onValueChange={setIsLoading} />
          </SwitchContainer>
          <SwitchContainer>
            <Text>Disabled</Text>
            <Switch value={isDisabled} onValueChange={setIsDisabled} />
          </SwitchContainer>
        </Section>

        <Section>
          <Text variant="heading" size="lg">
            Textos
          </Text>
          <Text size="xl">Extra Large Text</Text>
          <Text size="lg">Large Text</Text>
          <Text size="md">Medium Text</Text>
          <Text size="sm">Small Text</Text>
          <Text size="xs">Extra Small Text</Text>
        </Section>

        <Section>
          <Text variant="heading" size="lg">
            Botões
          </Text>
          <Button
            onPress={() => {}}
            variant="primary"
            size="md"
            loading={isLoading}
            disabled={isDisabled}
          >
            Primary Button
          </Button>
          <Button
            onPress={() => {}}
            variant="outline"
            size="md"
            loading={isLoading}
            disabled={isDisabled}
          >
            Outline Button
          </Button>
          <Button
            onPress={() => {}}
            variant="ghost"
            size="md"
            loading={isLoading}
            disabled={isDisabled}
          >
            Ghost Button
          </Button>
        </Section>
      </Container>
    </ScrollView>
  );
};

export default DesignSystemScreen;
