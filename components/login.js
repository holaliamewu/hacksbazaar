
export default function Login() {
    return(

        <div class="flex items-center justify-center min-h-screen bg-background">
          <div
            class="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md p-6 space-y-4"
            data-v0-t="card"
          >
            <div class="flex flex-col space-y-1.5 p-6">
              <div class="flex justify-between items-center">
                <h3 class="whitespace-nowrap tracking-tight text-2xl font-bold">Login</h3>
              </div>
              <p class="text-sm text-muted-foreground">Enter your credentials to access your account.</p>
            </div>
            <div class="p-6 space-y-4">
              <div class="space-y-2">
                <label
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  for="email"
                >
                  Email
                </label>
                <input
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="email"
                  placeholder="m@example.com"
                  required=""
                  type="email"
                />
              </div>
              <div class="space-y-2">
                <label
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  for="password"
                >
                  Password
                </label>
                <input
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="password"
                  required=""
                  type="password"
                />
              </div>
            </div>
            <div class="flex items-center p-6">
              <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">
                Login
              </button>
            </div>
          </div>
        </div>
    )
}