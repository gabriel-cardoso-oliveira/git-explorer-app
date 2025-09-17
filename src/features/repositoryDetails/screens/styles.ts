import styled from "@emotion/native";

export const ActivityIndicator = styled.ActivityIndicator(({ theme }) => ({
  marginVertical: theme.spacing.lg,
}));

export const ContainerDetails = styled.View(({ theme }) => ({
  flexDirection: "column",
  gap: theme.spacing.sm,
}));

export const ContainerLanguage = styled.View(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing.sm,
}));

export const Container = styled.View(({ theme }) => ({
  flex: 1,
  gap: theme.spacing.lg,
}));
