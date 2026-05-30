import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { sectionsItem } from "@/types/analysis"

type DetailsAnalysisProps = {
    sections: sectionsItem[]; 
}

const DetailsAnalysis = ({ sections }: DetailsAnalysisProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Detailed Analysis</CardTitle>
                <CardDescription>Section-by-section performance breakdown</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {sections.map((item: sectionsItem, index: number) => (
                    <>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h4 className="font-medium">{item.title}</h4>
                                <Badge variant="default">{item.badge}</Badge>
                            </div>
                            <Progress value={item.score} className="h-2" />
                            <p className="text-sm text-muted-foreground">
                                {item.feedback}
                            </p>
                        </div>

                        {index < sections.length - 1 && <Separator />}
                    </>
                ))}
            </CardContent>
        </Card>
    )
}

export default DetailsAnalysis;