<script setup>
  import MortgageCalculator from '@/homeloan/MortgageCalculator.vue'
  import TileOffer from '@/app/components/TileOffer.vue'
  import OfferingLayout from '@/app/layouts/OfferingLayout.vue'
  import { House, Percent } from 'lucide-vue-next'
</script>

<template>
  <OfferingLayout title="Home Loans" subtitle="Check out our mortgage loans">
    <TileOffer
      title="Fixed rate mortgage"
      description="Afford predictable monthly payments"
      :icon="House"
      ctaLink="/openaccount"
      :features="['Terms up to 30 years', 'No closing costs', 'No prepayment penalties']">
      Contact Us
    </TileOffer>
    <TileOffer
      title="Adjustable-rate mortgage"
      description="Enjoy flexible rates for shorter terms"
      :icon="Percent"
      ctaLink="/openaccount"
      :features="[
        '5/5 and 10/6 term options',
        'Lower initial interest rate',
        'No prepayment penalties',
        'No closing costs'
      ]">
      Contact Us
    </TileOffer>

    <MortgageCalculator></MortgageCalculator>
  </OfferingLayout>
</template>
