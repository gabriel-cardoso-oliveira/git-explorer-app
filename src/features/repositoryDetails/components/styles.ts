import styled from "@emotion/native";

export const Header = styled.View(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing.sm,
}));

export const TextContainer = styled.View(({ theme }) => ({
  flex: 1,
}));
