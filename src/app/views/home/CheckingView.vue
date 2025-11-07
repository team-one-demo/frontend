<script setup lang="ts">
  import { Banknote, CreditCard, Wallet } from 'lucide-vue-next'
  import TileOffer from '@/app/components/TileOffer.vue'
  import OfferingLayout from '@/app/layouts/OfferingLayout.vue'
</script>

<template>
  <OfferingLayout title="Checking solutions" subtitle="Find the right checking account to help you manage your money">
    <TileOffer
      title="Free checking"
      description="Our basic checking account"
      :icon="Banknote"
      ctaLink="/openaccount"
      :features="['No monthly service charge', 'No minimum balance', 'Direct deposit']">
      Open An Account
    </TileOffer>

    <TileOffer
      title="Premium checking"
      description="A checking account for professionals"
      :icon="CreditCard"
      ctaLink="/openaccount"
      :features="[
        '$10 monthly service charge',
        '$1,000 minimum daily balance',
        'Early direct deposit',
        'Up to $10 refunds for out-of-network ATM use'
      ]">
      Open An Account
    </TileOffer>

    <TileOffer
      title="Ultimate checking"
      description="Our most rewarding checking account"
      :icon="Wallet"
      ctaLink="/openaccount"
      :features="[
        '$25 monthly service charge',
        '$500 minimum daily balance',
        'Early direct deposit',
        'Unlimited refunds for out-of-network ATM use',
        'Access to high-yield savings'
      ]">
      Open An Account
    </TileOffer>
  </OfferingLayout>
</template>
