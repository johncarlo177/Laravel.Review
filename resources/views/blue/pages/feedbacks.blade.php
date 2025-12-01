@extends('blue.layouts.main')

@section('body')
    <div class="container py-4">
        <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
            <div>
                <h1 class="h3 mb-1">{{ t('Customer Feedbacks') }}</h1>
                <p class="text-muted mb-0">{{ t('Review the comments, ratings and details shared by your customers.') }}</p>
            </div>
        </div>

        <div class="row g-3 mb-4">
            <div class="col-6 col-lg-3">
                <div class="card shadow-sm border-0 h-100">
                    <div class="card-body">
                        <p class="text-muted text-uppercase fs-12 mb-1">{{ t('Total') }}</p>
                        <h4 class="mb-0">{{ $summary['total'] ?? 0 }}</h4>
                    </div>
                </div>
            </div>
            <div class="col-6 col-lg-3">
                <div class="card shadow-sm border-0 h-100">
                    <div class="card-body">
                        <p class="text-muted text-uppercase fs-12 mb-1">{{ t('5 Stars') }}</p>
                        <h4 class="mb-0">{{ $summary['stars_5'] ?? 0 }}</h4>
                    </div>
                </div>
            </div>
            <div class="col-6 col-lg-3">
                <div class="card shadow-sm border-0 h-100">
                    <div class="card-body">
                        <p class="text-muted text-uppercase fs-12 mb-1">{{ t('4 Stars') }}</p>
                        <h4 class="mb-0">{{ $summary['stars_4'] ?? 0 }}</h4>
                    </div>
                </div>
            </div>
            <div class="col-6 col-lg-3">
                <div class="card shadow-sm border-0 h-100">
                    <div class="card-body">
                        <p class="text-muted text-uppercase fs-12 mb-1">{{ t('3 Stars') }}</p>
                        <h4 class="mb-0">{{ $summary['stars_3'] ?? 0 }}</h4>
                    </div>
                </div>
            </div>
            <div class="col-6 col-lg-3">
                <div class="card shadow-sm border-0 h-100">
                    <div class="card-body">
                        <p class="text-muted text-uppercase fs-12 mb-1">{{ t('1 & 2 Stars') }}</p>
                        <h4 class="mb-0">{{ $summary['stars_1_2'] ?? 0 }}</h4>
                    </div>
                </div>
            </div>
        </div>

        <div class="card border-0 shadow-sm mb-4">
            <div class="card-body">
                <form method="GET" class="row g-3 align-items-end">
                    <div class="col-md-3">
                        <label class="form-label">{{ t('Search') }}</label>
                        <input type="text" class="form-control" name="search" value="{{ $filters['search'] ?? '' }}" placeholder="{{ t('Name, email, phone or feedback') }}">
                    </div>
                    <div class="col-md-3">
                        <label class="form-label">{{ t('QR Code') }}</label>
                        <select class="form-select" name="qrcode">
                            <option value="all">{{ t('All QR Codes') }}</option>
                            @foreach($qrcodes as $code)
                                <option value="{{ $code->id }}" @selected(($filters['qrcode'] ?? 'all') == $code->id)>
                                    {{ $code->name ?? $code->title ?? ('#'.$code->id) }}
                                </option>
                            @endforeach
                        </select>
                    </div>
                    <div class="col-md-2">
                        <label class="form-label">{{ t('Stars') }}</label>
                        <select class="form-select" name="stars">
                            <option value="all">{{ t('All') }}</option>
                            @for($i = 5; $i >= 1; $i--)
                                <option value="{{ $i }}" @selected(($filters['stars'] ?? 'all') == $i)>{{ $i }}</option>
                            @endfor
                        </select>
                    </div>
                    <div class="col-md-2">
                        <label class="form-label">{{ t('Sort By') }}</label>
                        <select class="form-select" name="sort_field">
                            <option value="created_at" @selected(($filters['sort_field'] ?? 'created_at') === 'created_at')>{{ t('Date') }}</option>
                            <option value="name" @selected(($filters['sort_field'] ?? '') === 'name')>{{ t('Name') }}</option>
                            <option value="email" @selected(($filters['sort_field'] ?? '') === 'email')>{{ t('Email') }}</option>
                            <option value="stars" @selected(($filters['sort_field'] ?? '') === 'stars')>{{ t('Stars') }}</option>
                        </select>
                    </div>
                    <div class="col-md-2">
                        <label class="form-label">{{ t('Direction') }}</label>
                        <select class="form-select" name="sort_direction">
                            <option value="desc" @selected(($filters['sort_direction'] ?? 'desc') === 'desc')>{{ t('Newest') }}</option>
                            <option value="asc" @selected(($filters['sort_direction'] ?? '') === 'asc')>{{ t('Oldest') }}</option>
                        </select>
                    </div>
                    <div class="col-md-2">
                        <label class="form-label">{{ t('Per Page') }}</label>
                        <select class="form-select" name="per_page">
                            @foreach([10, 25, 50, 100] as $size)
                                <option value="{{ $size }}" @selected((int)($filters['per_page'] ?? 10) === $size)>{{ $size }}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="col-md-12 d-flex gap-2">
                        <button type="submit" class="btn btn-primary">{{ t('Apply Filters') }}</button>
                        <a href="{{ route('feedbacks.index') }}" class="btn btn-outline-secondary">{{ t('Reset') }}</a>
                    </div>
                </form>
            </div>
        </div>

        <div class="card border-0 shadow-sm">
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover mb-0">
                        <thead class="table-light">
                        <tr>
                            <th>#</th>
                            <th>{{ t('Customer') }}</th>
                            <th>{{ t('Contact') }}</th>
                            <th>{{ t('Stars') }}</th>
                            <th>{{ t('Feedback') }}</th>
                            <th>{{ t('QR Code') }}</th>
                            <th>{{ t('Date') }}</th>
                        </tr>
                        </thead>
                        <tbody>
                        @forelse($feedbacks as $feedback)
                            <tr>
                                <td>{{ $loop->iteration + max(0, ($feedbacks->firstItem() ?? 1) - 1) }}</td>
                                <td>
                                    <strong>{{ $feedback->name ?: t('Anonymous') }}</strong><br>
                                    <span class="text-muted fs-12">{{ $feedback->mobile ?: t('N/A') }}</span>
                                </td>
                                <td>
                                    <span class="d-block">{{ $feedback->email ?: t('N/A') }}</span>
                                </td>
                                <td>
                                    <span class="badge bg-warning text-dark">{{ $feedback->stars }}</span>
                                </td>
                                <td style="max-width: 320px;">
                                    <div class="text-wrap">{{ $feedback->feedback ?: '-' }}</div>
                                </td>
                                <td>
                                    {{ optional($feedback->qrcode)->title ?? optional($feedback->qrcode)->short_url ?? '#'.$feedback->qrcode_id }}
                                </td>
                                <td>
                                    {{ optional($feedback->created_at)->format('d M Y, h:i A') }}
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="7" class="text-center py-4 text-muted">
                                    {{ t('No feedback found for the selected filters.') }}
                                </td>
                            </tr>
                        @endforelse
                        </tbody>
                    </table>
                </div>
            </div>
            @if($feedbacks->hasPages())
                <div class="card-footer">
                    {{ $feedbacks->withQueryString()->links() }}
                </div>
            @endif
        </div>
    </div>
@endsection

