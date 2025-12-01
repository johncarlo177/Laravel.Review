@php
    $layoutBodyAttributes = ContentManager::bodyClass();

    if (isset($bodyAttributes)) {
        $layoutBodyAttributes = $bodyAttributes;
    }
@endphp

<!DOCTYPE html>
<html lang="{{ $composer->locale() }}" dir={{ $composer->direction() }}>



<head>
    @include('blue.partials.head.entrypoint')

    {!! $composer->frontendHeadCustomCode() !!}
</head>

<body {!! $layoutBodyAttributes !!}>

    {!! ContentManager::customCode('Body Tag: after open.') !!}

    @section('body')
    @show

    {!! ContentManager::customCode('Body Tag: before close.') !!}

    {!! PluginManager::doAction(PluginManager::ACTION_BODY_BEFORE_CLOSE) !!}

    @include('blue.components.gdpr')

    {{-- AI Recovery Widget --}}
    <script>
        // Ensure widget is initialized after page load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                if (typeof window.AIRecoveryWidget === 'undefined') {
                    console.log('AI Recovery Widget: Initializing...');
                    // Widget should auto-initialize, but ensure it's available
                }
            });
        } else {
            if (typeof window.AIRecoveryWidget === 'undefined') {
                console.log('AI Recovery Widget: Already loaded or initializing...');
            }
        }
    </script>

</body>

</html>
