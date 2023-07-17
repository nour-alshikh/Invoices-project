<?php

namespace App\Providers;

use App\Interfaces\Home\HomeRepositoryInterface;
use App\Interfaces\Invoices\InvoiceAttachmentRepositoryInterface;
use App\Interfaces\Invoices\InvoiceDetailRepositoryInterface;
use App\Interfaces\Invoices\InvoiceRepositoryInterface;
use App\Interfaces\Invoices\InvoicesArchiveRepositoryInterface;
use App\Interfaces\Products\ProductRepositoryInterface;
use App\Interfaces\Reports\CustomerReportRepositoryInterface;
use App\Interfaces\Reports\InvoiceReportRepositoryInterface;
use App\Interfaces\Sections\SectionRepositoryInterface;
use Illuminate\Support\ServiceProvider;
use App\Interfaces\User\UserRepositoryInterface;
use App\Repository\Home\HomeRepository;
use App\Repository\Invoices\InvoiceAttachmentRepository;
use App\Repository\Invoices\InvoiceDetailRepository;
use App\Repository\Invoices\InvoiceRepository;
use App\Repository\Invoices\InvoicesArchiveRepository;
use App\Repository\Products\ProductRepository;
use App\Repository\Reports\CustomerReportRepository;
use App\Repository\Reports\InvoiceReportRepository;
use App\Repository\Sections\SectionRepository;
use App\Repository\User\UserRepository;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(CustomerReportRepositoryInterface::class, CustomerReportRepository::class);
        $this->app->bind(InvoiceReportRepositoryInterface::class, InvoiceReportRepository::class);
        $this->app->bind(HomeRepositoryInterface::class, HomeRepository::class);
        $this->app->bind(InvoiceAttachmentRepositoryInterface::class, InvoiceAttachmentRepository::class);
        $this->app->bind(InvoiceRepositoryInterface::class, InvoiceRepository::class);
        $this->app->bind(InvoiceDetailRepositoryInterface::class, InvoiceDetailRepository::class);
        $this->app->bind(InvoicesArchiveRepositoryInterface::class, InvoicesArchiveRepository::class);
        $this->app->bind(ProductRepositoryInterface::class, ProductRepository::class);
        $this->app->bind(SectionRepositoryInterface::class, SectionRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
    }
}
