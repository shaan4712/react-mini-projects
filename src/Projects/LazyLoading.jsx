import React, {lazy, Suspense} from 'react'

const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

const App = () => {
    return (
        <div>
            <Suspense fallback={<div> Loading ... </div>}>
                <HeavyComponent />
            </Suspense>
        </div>
    )
}

export default App;