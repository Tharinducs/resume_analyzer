import { GeneralAnalysisResult } from "@/types/analysis";
import { AlertTriangle, CheckCircle } from "lucide-react"
import { getFindingsClassName } from "../../utility";

type KeyFindingsProps = {
    analysisResult: GeneralAnalysisResult | undefined;
}

const KeyFindings = ({ analysisResult }: KeyFindingsProps) => {
    return (
        <div className="space-y-4">
            <h4 className="font-semibold">Key Findings</h4>
            <div className="grid gap-3 md:grid-cols-2">
                {analysisResult?.keyFindings && analysisResult.keyFindings.length > 0 && (
                    analysisResult.keyFindings.map((finding) => (
                        <div key={finding._id} className={`flex items-center space-x-3 p-3 rounded-lg ${getFindingsClassName(finding.type)}`}>
                            {finding.type === "positive" ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                            )}
                            <span className="text-sm">{finding.text}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default KeyFindings;