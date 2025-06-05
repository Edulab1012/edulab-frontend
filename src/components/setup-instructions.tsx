import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"

export default function SetupInstructions() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>🚀</span>
            Supabase Setup Instructions
          </CardTitle>
          <CardDescription>
            Follow these steps to configure your Supabase database for the chat application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">


          <div className="space-y-4">
            <div>
              <Badge variant="outline" className="mb-2">
                Step 1
              </Badge>
              <h3 className="font-semibold">Create a Supabase Project</h3>
              <p className="text-sm text-gray-600">
                Go to{" "}
                <a href="https://supabase.com" className="text-blue-600 underline">
                  supabase.com
                </a>{" "}
                and create a new project
              </p>
            </div>

            <div>
              <Badge variant="outline" className="mb-2">
                Step 2
              </Badge>
              <h3 className="font-semibold">Get Your Credentials</h3>
              <p className="text-sm text-gray-600">From your Supabase dashboard, go to Settings → API and copy:</p>
              <ul className="text-sm text-gray-600 ml-4 mt-1">
                <li>• Project URL</li>
                <li>• Anon/Public key</li>
              </ul>
            </div>

            <div>
              <Badge variant="outline" className="mb-2">
                Step 3
              </Badge>
              <h3 className="font-semibold">Set Environment Variables</h3>
              <p className="text-sm text-gray-600">
                Create a <code>.env.local</code> file with:
              </p>
              <pre className="bg-gray-100 p-3 rounded text-xs mt-2">
                {`NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key`}
              </pre>
            </div>

            <div>
              <Badge variant="outline" className="mb-2">
                Step 4
              </Badge>
              <h3 className="font-semibold">Create the Messages Table</h3>
              <p className="text-sm text-gray-600">
                Run the SQL script provided in the project to create the messages table and set up RLS policies.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
