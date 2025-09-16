import styled from "@emotion/native";

export const Container = styled.View(({ theme }) => ({
  flex: 1,
  gap: theme.spacing.md,
}));

export const ActivityIndicator = styled.ActivityIndicator(({ theme }) => ({
  marginVertical: theme.spacing.lg,
}));
