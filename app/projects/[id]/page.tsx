import { ProjectDetail } from "@/components/projects/project-detail"

export default function ProjectDetailPage({
  params,
}: {
  params: { id: string }
}) {
  return <ProjectDetail projectId={params.id} />
}
