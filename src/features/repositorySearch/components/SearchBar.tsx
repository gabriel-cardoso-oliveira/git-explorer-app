import React from "react";

import Input from "@/designSystem/components/Input";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
}) => (
  <Input
    value={value}
    onChangeText={onChangeText}
    placeholder="Buscar repositórios..."
  />
);
