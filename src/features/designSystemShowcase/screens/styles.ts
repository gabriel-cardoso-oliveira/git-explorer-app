import styled from "@emotion/native";

export const Container = styled.View(({ theme }) => ({
  flexGrow: 1,
  gap: theme.spacing.lg,
}));

export const Section = styled.View(({ theme }) => ({
  gap: theme.spacing.xs,
}));

export const ThemeSwitchContainer = styled.View(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing.sm,
}));
