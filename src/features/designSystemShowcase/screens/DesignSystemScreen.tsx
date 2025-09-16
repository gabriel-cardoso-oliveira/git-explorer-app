import React, { useState } from "react";
import { ScrollView, View } from "react-native";

import Button from "@/designSystem/components/Button";
import Input from "@/designSystem/components/Input";
import { Surface } from "@/designSystem/components/Surface";
import Switch from "@/designSystem/components/Switch";
import Text from "@/designSystem/components/Text";
import { useThemeMode } from "@/designSystem/theme";

import { Container, Section, SwitchContainer } from "./styles";

const DesignSystemScreen = () => {
  const { themeMode, toggleThemeMode } = useThemeMode();
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [inputValue, setInputValue] = useState("Some text");

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
            Alternâncias de estado
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
          <View>
            <Text size="xl">Extra Large Text</Text>
            <Text size="lg">Large Text</Text>
            <Text size="md">Medium Text</Text>
            <Text size="sm">Small Text</Text>
            <Text size="xs">Extra Small Text</Text>
          </View>
        </Section>

        <Section>
          <Text variant="heading" size="lg">
            Botões
          </Text>
          <Button
            onPress={() => {}}
            variant="primary"
            size="sm"
            loading={isLoading}
            disabled={isDisabled}
          >
            Primary Button
          </Button>
          <Button
            onPress={() => {}}
            variant="outline"
            size="sm"
            loading={isLoading}
            disabled={isDisabled}
          >
            Outline Button
          </Button>
          <Button
            onPress={() => {}}
            variant="ghost"
            size="sm"
            loading={isLoading}
            disabled={isDisabled}
          >
            Ghost Button
          </Button>
        </Section>

        <Section>
          <Text variant="heading" size="lg">
            Campos de texto
          </Text>
          <Input
            label="Label"
            value={inputValue}
            onChangeText={setInputValue}
            placeholder="Placeholder"
            size="sm"
            editable={!isDisabled}
          />
          <Input
            label="Helper Text"
            value={inputValue}
            onChangeText={setInputValue}
            placeholder="Placeholder"
            helperText="This is a helper text."
            size="sm"
            editable={!isDisabled}
          />
          <Input
            label="Error State"
            value={inputValue}
            onChangeText={setInputValue}
            placeholder="Placeholder"
            error="This field has an error."
            size="sm"
            editable={!isDisabled}
          />
        </Section>

        <Section>
          <Text variant="heading" size="lg">
            Surperfícies
          </Text>
          <Surface>
            <Text>This is a surface.</Text>
          </Surface>
        </Section>
      </Container>
    </ScrollView>
  );
};

export default DesignSystemScreen;
