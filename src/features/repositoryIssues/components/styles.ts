import styled from "@emotion/native";

export const Body = styled.View(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: theme.spacing.sm,
}));

export const AuthorArea = styled.View(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing.sm,
}));

export const LabelsArea = styled.View(({ theme }) => ({
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: theme.spacing.sm,
  gap: theme.spacing.xs,
}));
