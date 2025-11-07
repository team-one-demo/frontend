<script setup>
  import AutoLoanCalculator from '@/autoloan-calc/AutoLoanCalculator.vue'
  import TileOffer from '@/app/components/TileOffer.vue'
  import { Car, Truck } from 'lucide-vue-next'
  import OfferingLayout from '@/app/layouts/OfferingLayout.vue'
</script>

<template>
  <OfferingLayout title="Auto Loans" subtitle="Check out our auto loan options">
    <TileOffer
      title="Purchase"
      description="New and used vehicles"
      :icon="Car"
      ctaLink=""
      :features="['Low rates', 'No payments for 90 days', 'No prepayment penalties']">
      Contact Us
    </TileOffer>
    <TileOffer
      title="Refinance"
      description="Shorter-term loans to pay off your car"
      :icon="Truck"
      ctaLink=""
      :features="[
        'Low rates',
        'No payments for 90 days',
        'Refinance bonus available',
        'No impact on your credit score'
      ]">
      Contact Us
    </TileOffer>

    <AutoLoanCalculator></AutoLoanCalculator>
  </OfferingLayout>
</template>
