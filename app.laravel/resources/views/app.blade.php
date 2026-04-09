<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>PrimeVue - Vue UI Component Library</title>
    <meta name="description" content="The ultimate collection of design-agnostic, flexible and accessible Vue UI Components.">
    <link rel="icon" href="/favicon.ico">
    <link rel="stylesheet" href="https://rsms.me/inter/inter.css">
    <script src="/scripts/prism.js" data-manual></script>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>
    <div id="app"></div>
</body>
</html>
