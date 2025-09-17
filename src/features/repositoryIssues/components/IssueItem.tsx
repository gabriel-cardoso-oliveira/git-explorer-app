import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import React from "react";

import { Issue } from "@/core/domain/entities/issue";
import Avatar from "@/designSystem/components/Avatar";
import Badge from "@/designSystem/components/Badge";
import Surface from "@/designSystem/components/Surface";
import Text from "@/designSystem/components/Text";

import { AuthorArea, Body, LabelsArea } from "./styles";

interface IssueItemProps {
  issue: Issue;
}

const IssueItem: React.FC<IssueItemProps> = ({ issue }) => (
  <Surface>
    <Text size="sm" color="muted">
      #{issue.number}
    </Text>
    <Text variant="heading">{issue.title}</Text>
    <Body>
      <AuthorArea>
        <Avatar source={{ uri: issue.user.avatar_url }} size="xs" />
        <Text size="sm" color="muted">
          {issue.user.login}
        </Text>
      </AuthorArea>
      <Text size="sm" color="muted">
        há{" "}
        {formatDistanceToNow(new Date(issue.created_at), {
          locale: ptBR,
          addSuffix: false,
        })}
      </Text>
    </Body>
    {issue.labels.length > 0 && (
      <LabelsArea>
        {issue.labels.map((label) => (
          <Badge key={label.name} color="primary">
            {label.name}
          </Badge>
        ))}
      </LabelsArea>
    )}
  </Surface>
);

export default IssueItem;
