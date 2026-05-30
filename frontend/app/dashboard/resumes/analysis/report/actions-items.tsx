import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { recommendationsItem } from "@/types/analysis";
import { getRecommendationClassName } from "../../utility";

type ActionItemsProps = {
    recommendations: recommendationsItem[];
}

const ActionItems = ({ recommendations }: ActionItemsProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recommended Actions</CardTitle>
                <CardDescription>Priority improvements to enhance your resume</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {recommendations.map((rec, index) => (
                        <div key={rec._id} className={`flex items-start space-x-3 p-4 rounded-lg ${getRecommendationClassName(rec.priority).main}`}>
                            <div className={`rounded-full size-6 shrink-0 flex items-center justify-center text-xs font-bold ${getRecommendationClassName(rec.priority).child}`}>
                                {index + 1}
                            </div>
                            <div className="space-y-1">
                                <h4 className={`font-medium ${getRecommendationClassName(rec.priority).title}`}>
                                    {rec.priority} Priority
                                </h4>
                                <p className="text-sm">{rec.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default ActionItems;