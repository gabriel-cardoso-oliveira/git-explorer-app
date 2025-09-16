import styled from "@emotion/native";

export const Header = styled.View(() => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}));

export const Footer = styled.View(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing.sm,
  marginTop: theme.spacing.sm,
}));
