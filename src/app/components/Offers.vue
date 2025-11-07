<script lang="ts" setup>
  import TileOffer from './TileOffer.vue'
  import BenefitItem from './BenefitItem.vue'
  import OfferSectionLayout from '@/app/layouts/OfferSectionLayout.vue'
  import { Banknote, PiggyBank, Car, Home, CreditCard, Shield } from 'lucide-vue-next'
</script>

<template>
  <OfferSectionLayout
    title="Banking Made Simple"
    subtitle="Discover our comprehensive suite of financial products designed to help you achieve your goals. From everyday banking to major life purchases, we're here to support you every step of the way."
    variant="light">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
      <TileOffer
        title="Checking solutions"
        description="Explore our different types of checking accounts with no monthly fees and unlimited transactions"
        :icon="Banknote"
        ctaLink="/checking" />
      <TileOffer
        title="Savings accounts"
        description="Choose the savings account that's right for you with competitive APY rates up to 4.5%"
        :icon="PiggyBank"
        ctaLink="/savings" />
      <TileOffer
        title="Home loans"
        description="Make your dream home a reality with our competitive mortgage rates and flexible terms"
        :icon="Home"
        ctaLink="/homeloans" />
      <TileOffer
        title="Auto loans"
        description="Drive away in your dream car with low rates and quick approval process"
        :icon="Car"
        ctaLink="/autoloans" />
      <TileOffer
        title="Credit cards"
        description="Earn rewards on every purchase with our cashback and travel credit cards"
        :icon="CreditCard"
        ctaLink="/checking" />
      <TileOffer
        title="Secure banking"
        description="Bank with confidence knowing your money is protected with industry-leading security"
        :icon="Shield"
        ctaLink="/checking" />
    </div>
  </OfferSectionLayout>

  <!-- Benefits Section -->
  <OfferSectionLayout
    title="Why Choose Us?"
    subtitle="Experience banking the way it should be"
    variant="dark"
    class="rounded-xl">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <BenefitItem
        value="24/7"
        title="Always Available"
        description="Access your accounts anytime, anywhere with our mobile app and online banking" />
      <BenefitItem
        value="$0"
        title="No Hidden Fees"
        description="No monthly maintenance fees, no minimum balance requirements, no surprises" />
      <BenefitItem
        value="2+"
        title="Happy Customers"
        description="Join thousands of satisfied customers who trust us with their finances" />
    </div>
  </OfferSectionLayout>

  <!-- Call to Action -->
  <OfferSectionLayout
    title="Ready to Get Started?"
    subtitle="Open your account today and experience the difference. No paperwork, no waiting - get started in just a few minutes."
    variant="light">
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <RouterLink
        to="/openaccount"
        class="px-8 py-3 rounded-lg font-medium bg-gradient-to-br from-primary to-primary-two text-white hover:brightness-110 transition-all">
        Open an Account
      </RouterLink>
    </div>
  </OfferSectionLayout>
</template>
